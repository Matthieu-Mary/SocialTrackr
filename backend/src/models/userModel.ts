import supabase from "../config/supabase";
import bcrypt from "bcrypt";
import { User, UserCreationData } from "../types";

const UserModel = {
  /**
   * Génère un ID numérique aléatoire à 8 chiffres
   * @returns {number} - ID numérique
   */
  generateRandomId(): number {
    // Génération d'un nombre aléatoire entre 10000000 et 99999999 (8 chiffres)
    return Math.floor(10000000 + Math.random() * 90000000);
  },

  /**
   * Vérifie si l'ID existe déjà dans la table Users
   * @param {number} id - ID à vérifier
   * @returns {Promise<boolean>} - True si l'ID existe déjà
   */
  async idExists(id: number): Promise<boolean> {
    const { data, error } = await supabase
      .from("Users")
      .select("id")
      .eq("id", id)
      .single();

    return !error && data !== null;
  },

  /**
   * Génère un ID unique à 8 chiffres
   * @returns {Promise<number>} - ID unique
   */
  async generateUniqueId(): Promise<number> {
    let id = this.generateRandomId();
    let exists = await this.idExists(id);

    // Réessayer jusqu'à obtenir un ID unique
    while (exists) {
      id = this.generateRandomId();
      exists = await this.idExists(id);
    }

    return id;
  },

  /**
   * Crée un nouvel utilisateur dans Supabase
   * @param {UserCreationData} userData - Données de l'utilisateur
   * @returns {Promise<Object>} - Utilisateur créé
   */
  async create(userData: UserCreationData): Promise<{ user: User; auth: any }> {
    try {
      // Hashage du mot de passe
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      // Création de l'authentification
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            username: userData.username,
          },
        },
      });

      if (authError) {
        console.error("Erreur d'authentification:", authError);
        throw authError;
      }

      // S'assurer que authData et authData.user existent
      if (!authData || !authData.user) {
        throw new Error("Données utilisateur non retournées par Supabase");
      }

      // Génération d'un ID unique à 8 chiffres
      const uniqueId = await this.generateUniqueId();
      console.log("ID unique généré:", uniqueId);

      // Création de l'entrée dans la table Users
      const { data, error } = await supabase
        .from("Users")
        .insert([
          {
            id: uniqueId,
            auth_id: authData.user.id, // Stockage de l'ID d'authentification dans une colonne séparée
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ])
        .select();

      if (error) {
        console.error("Erreur d'insertion dans la table Users:", error);
        throw error;
      }

      return { user: data[0] as User, auth: authData };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Recherche un utilisateur par son email
   * @param {string} email - Email de l'utilisateur
   * @returns {Promise<User|null>} - Utilisateur trouvé ou null
   */
  async findByEmail(email: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", email)
        .single();

      if (error) {
        console.error("Erreur lors de la recherche de l'utilisateur:", error);
        return null;
      }

      return data as User;
    } catch (error) {
      console.error("Exception lors de la recherche de l'utilisateur:", error);
      throw error;
    }
  },

  /**
   * Vérifie si le mot de passe correspond au hash stocké
   * @param {string} password - Mot de passe en clair
   * @param {string} hashedPassword - Mot de passe hashé stocké
   * @returns {Promise<boolean>} - True si le mot de passe correspond
   */
  async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  },
};

export default UserModel;

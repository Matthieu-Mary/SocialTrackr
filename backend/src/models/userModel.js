const supabase = require("../config/supabase");
const bcrypt = require("bcrypt");

const UserModel = {
  /**
   * Génère un ID numérique aléatoire à 8 chiffres
   * @returns {number} - ID numérique
   */
  generateRandomId() {
    // Génération d'un nombre aléatoire entre 10000000 et 99999999 (8 chiffres)
    return Math.floor(10000000 + Math.random() * 90000000);
  },

  /**
   * Vérifie si l'ID existe déjà dans la table Users
   * @param {number} id - ID à vérifier
   * @returns {Promise<boolean>} - True si l'ID existe déjà
   */
  async idExists(id) {
    const { data, error } = await supabase
      .from("Users")
      .select("id")
      .eq("id", id)
      .single();

    return !error && data;
  },

  /**
   * Génère un ID unique à 8 chiffres
   * @returns {Promise<number>} - ID unique
   */
  async generateUniqueId() {
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
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise<Object>} - Utilisateur créé
   */
  async create(userData) {
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

      return { user: data[0], auth: authData };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = UserModel;

import UserModel from "../models/userModel";
import { User, UserCreationData, UserAuthData, UserResponse } from "../types";

const UserService = {
  /**
   * Crée un nouvel utilisateur
   * @param {UserCreationData} userData - Données de l'utilisateur
   * @returns {Promise<Object>} - Utilisateur créé
   */
  async createUser(
    userData: UserCreationData
  ): Promise<{ user: User; auth: any }> {
    // Validation des données
    if (!userData.email || !userData.username || !userData.password) {
      throw new Error("Email, username et password sont requis");
    }

    // Vérification du format de l'email - format plus strict conforme à la plupart des services
    // Cette regex est plus stricte et peut mieux correspondre aux attentes de Supabase
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error(`Format d'email invalide: ${userData.email}`);
    }

    // Vérification que l'email ne contient pas d'espaces
    if (userData.email.includes(" ")) {
      throw new Error("L'email ne doit pas contenir d'espaces");
    }

    // Nettoyage de l'email (trim)
    userData.email = userData.email.trim();

    // Vérification de la force du mot de passe
    if (userData.password.length < 6) {
      throw new Error("Le mot de passe doit contenir au moins 6 caractères");
    }

    // Vérification du nom d'utilisateur
    if (userData.username.length < 3) {
      throw new Error(
        "Le nom d'utilisateur doit contenir au moins 3 caractères"
      );
    }

    // Création de l'utilisateur via le modèle
    try {
      return await UserModel.create(userData);
    } catch (error) {
      console.error("Erreur dans le service utilisateur:", error);
      throw error;
    }
  },

  /**
   * Connecte un utilisateur existant
   * @param {UserAuthData} credentials - Identifiants de connexion (email, password)
   * @returns {Promise<UserResponse>} - Informations de l'utilisateur authentifié
   */
  async loginUser(credentials: UserAuthData): Promise<UserResponse> {
    // Validation des données
    if (!credentials.email || !credentials.password) {
      throw new Error("Email et mot de passe sont requis");
    }

    // Trouver l'utilisateur par email
    const user = await UserModel.findByEmail(credentials.email);
    if (!user) {
      throw new Error("Identifiants incorrects");
    }

    // Vérification du mot de passe
    const isPasswordValid = await UserModel.verifyPassword(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Identifiants incorrects");
    }

    // Ne pas renvoyer le mot de passe hashé
    const { password, ...userWithoutPassword } = user;

    // On pourrait ici générer un token JWT si nécessaire

    return userWithoutPassword as UserResponse;
  },
};

export default UserService;

const UserModel = require("../models/userModel");

const UserService = {
  /**
   * Crée un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise<Object>} - Utilisateur créé
   */
  async createUser(userData) {
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
};

module.exports = UserService;

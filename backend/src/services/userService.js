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

    // Vérification du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error("Format d'email invalide");
    }

    // Vérification de la force du mot de passe
    if (userData.password.length < 6) {
      throw new Error("Le mot de passe doit contenir au moins 6 caractères");
    }

    // Création de l'utilisateur via le modèle
    return await UserModel.create(userData);
  },
};

module.exports = UserService;

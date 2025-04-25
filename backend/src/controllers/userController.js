const UserService = require("../services/userService");

const UserController = {
  /**
   * Crée un nouvel utilisateur
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   */
  async register(req, res) {
    try {
      const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };

      const result = await UserService.createUser(userData);

      // Ne pas renvoyer le mot de passe hashé ni les informations sensibles
      const { password, ...safeUserData } = result.user;

      res.status(201).json({
        success: true,
        message: "Utilisateur créé avec succès",
        user: safeUserData,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Échec de la création de l'utilisateur",
        error: error.message,
      });
    }
  },
};

module.exports = UserController;

import { Request, Response } from "express";
import UserService from "../services/userService";
import { UserCreationData, UserAuthData } from "../types";

const UserController = {
  /**
   * Crée un nouvel utilisateur
   * @param {Request} req - Requête Express
   * @param {Response} res - Réponse Express
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      const userData: UserCreationData = {
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
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Échec de la création de l'utilisateur",
        error: error.message,
      });
    }
  },

  /**
   * Authentifie un utilisateur existant
   * @param {Request} req - Requête Express
   * @param {Response} res - Réponse Express
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const credentials: UserAuthData = {
        email: req.body.email,
        password: req.body.password,
      };

      const user = await UserService.loginUser(credentials);

      res.status(200).json({
        success: true,
        message: "Connexion réussie",
        user,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: "Échec de l'authentification",
        error: error.message,
      });
    }
  },
};

export default UserController;

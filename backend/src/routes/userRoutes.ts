import express from "express";
import UserController from "../controllers/userController";

const router = express.Router();

// Route pour la création d'un utilisateur
router.post("/register", UserController.register);

// Route pour l'authentification d'un utilisateur
router.post("/login", UserController.login);

export default router;

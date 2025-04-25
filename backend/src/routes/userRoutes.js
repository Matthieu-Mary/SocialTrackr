const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// Route pour la création d'un utilisateur
router.post("/register", UserController.register);

// Route pour l'authentification d'un utilisateur
router.post("/login", UserController.login);

module.exports = router;

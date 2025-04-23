const express = require("express");
const path = require("path");

// Initialisation de l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Définition d'une route de base pour tester
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API SocialTrackr" });
});

// Gestionnaire d'erreur 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// Gestionnaire d'erreur global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Erreur serveur",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

module.exports = app;

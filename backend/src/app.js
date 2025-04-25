const express = require("express");
const path = require("path");
const supabase = require("./config/supabase");

// Initialisation de l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Définition d'une route de base pour tester
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API SocialTrackr" });
});

// Route pour tester la connexion à Supabase
app.get("/api/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase.from("test").select("*").limit(1);

    if (error) throw error;

    res.json({
      message: "Connexion à Supabase réussie",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur de connexion à Supabase",
      error: error.message,
    });
  }
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

import app from "./app";
import dotenv from "dotenv";

// Chargement des variables d'environnement
dotenv.config();

// Définition du port
const PORT = process.env.SERVER_PORT || 3000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

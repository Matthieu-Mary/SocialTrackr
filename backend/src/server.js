const app = require("./app");

// Définition du port
const PORT = process.env.SERVER_PORT || 3000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

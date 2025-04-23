const express = require("express");
const router = express.Router();

// Route racine
router.get("/", (req, res) => {
  res.json({ message: "API SocialTrackr - Version 1.0" });
});

// D'autres routes seront ajoutées ici quand les fonctionnalités seront développées

module.exports = router;

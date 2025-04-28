import express, { Request, Response } from "express";
import userRoutes from "./userRoutes";

const router = express.Router();

// Route racine
router.get("/", (req: Request, res: Response) => {
  res.json({ message: "API SocialTrackr - Version 1.0" });
});

// Configuration des routes
router.use("/users", userRoutes);

// D'autres routes seront ajoutées ici quand les fonctionnalités seront développées

export default router;

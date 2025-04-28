import express, { Request, Response, NextFunction, Application } from "express";
import path from "path";
import cors from "cors";
import routes from "./routes";

// Initialisation de l'application Express
const app: Application = express();

// Configuration de CORS
app.use(
  cors({
    origin: "http://localhost:4200", // URL du frontend Angular
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Définition d'une route de base pour tester
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Bienvenue sur l'API SocialTrackr" });
});

// Routes
app.use("/api", routes);

// Gestionnaire d'erreur 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// Gestionnaire d'erreur global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Erreur serveur",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

export default app;

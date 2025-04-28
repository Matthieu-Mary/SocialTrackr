import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../types";

/**
 * Middleware qui vérifie si l'utilisateur est authentifié
 * @param {Request} req - Objet requête Express
 * @param {Response} res - Objet réponse Express
 * @param {NextFunction} next - Fonction next d'Express
 */
const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Vérifier le token d'authentification (exemple)
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      success: false,
      message: "Authentification requise",
    });
    return;
  }

  // Dans une implémentation réelle, nous vérifierions le token
  // et attacherions les informations de l'utilisateur à req.user

  // Pour cet exemple, nous considérons l'utilisateur comme authentifié
  req.user = {
    userId: 1,
    username: "exemple_utilisateur",
    email: "exemple@mail.com",
    role: "user",
  };

  next();
};

/**
 * Middleware qui vérifie si l'utilisateur a les permissions requises
 * @param {Array<string>} roles - Tableau des rôles autorisés
 * @returns {Function} Middleware Express
 */
const hasRole = (
  roles: string[] = []
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Vérifier si l'utilisateur existe (devrait être attaché par isAuthenticated)
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentification requise",
      });
      return;
    }

    // Vérifier le rôle (exemple)
    const userRole = req.user.role || "user";

    if (!roles.includes(userRole)) {
      res.status(403).json({
        success: false,
        message: "Accès refusé",
      });
      return;
    }

    next();
  };
};

export { isAuthenticated, hasRole };

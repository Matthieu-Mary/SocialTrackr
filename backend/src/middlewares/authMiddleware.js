// Middleware d'authentification
// Ce fichier est un exemple de middleware d'authentification

/**
 * Middleware qui vérifie si l'utilisateur est authentifié
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @param {Function} next - Fonction next d'Express
 */
const isAuthenticated = (req, res, next) => {
  // Vérifier le token d'authentification (exemple)
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authentification requise",
    });
  }

  // Dans une implémentation réelle, nous vérifierions le token
  // et attacherions les informations de l'utilisateur à req.user

  // Pour cet exemple, nous considérons l'utilisateur comme authentifié
  req.user = { id: 1, username: "exemple_utilisateur" };

  next();
};

/**
 * Middleware qui vérifie si l'utilisateur a les permissions requises
 * @param {Array<string>} roles - Tableau des rôles autorisés
 * @returns {Function} Middleware Express
 */
const hasRole = (roles = []) => {
  return (req, res, next) => {
    // Vérifier si l'utilisateur existe (devrait être attaché par isAuthenticated)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentification requise",
      });
    }

    // Vérifier le rôle (exemple)
    const userRole = req.user.role || "user";

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Accès refusé",
      });
    }

    next();
  };
};

module.exports = {
  isAuthenticated,
  hasRole,
};

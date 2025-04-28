// Types pour les utilisateurs
export interface User {
  id: number;
  auth_id: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserCreationData {
  username: string;
  email: string;
  password: string;
}

export interface UserAuthData {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  auth_id: string;
  username: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

// Types pour l'authentification
export interface JwtPayload {
  userId: number;
  email: string;
  username: string;
  role: string;
}

// Étendre les types Express pour inclure l'utilisateur dans les requêtes
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

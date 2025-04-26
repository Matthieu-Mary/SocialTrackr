// Interface pour les données de connexion
export interface LoginRequest {
  email: string;
  password: string;
}

// Interface pour la réponse du serveur
export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    auth_id: string;
  };
  error?: string;
}

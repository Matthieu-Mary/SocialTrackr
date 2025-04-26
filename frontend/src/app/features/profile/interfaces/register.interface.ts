// Interface pour les données d'inscription
export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
  }
  
  // Interface pour la réponse du serveur
  export interface RegisterResponse {
    success: boolean;
    message: string;
    user?: {
      id: number;
      username: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      auth_id: string
    };
    error?: string;
  }
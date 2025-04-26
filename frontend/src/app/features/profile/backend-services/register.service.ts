import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    id: string;
    username: string;
    email: string;
    createdAt: string;
  };
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/api/users';

  private _http = inject(HttpClient);

  /**
   * Enregistre un nouvel utilisateur via l'API
   * @param userData Données d'inscription de l'utilisateur
   * @returns Observable contenant la réponse du serveur
   */
  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this._http.post<RegisterResponse>(
      `${this.apiUrl}/register`,
      userData
    );
  }
}

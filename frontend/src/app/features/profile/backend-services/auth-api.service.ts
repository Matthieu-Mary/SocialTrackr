import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../interfaces/login.interface';
import {
  RegisterRequest,
  RegisterResponse,
} from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private apiUrl = 'http://localhost:3000/api/users';
  private _http = inject(HttpClient);

  /**
   * Authentifie un utilisateur via l'API
   * @param credentials Informations de connexion (email, password)
   * @returns Observable contenant la réponse du serveur
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

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

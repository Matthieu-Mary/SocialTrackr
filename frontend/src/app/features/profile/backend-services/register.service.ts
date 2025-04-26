import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest, RegisterResponse } from '../interfaces/register.interface';

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

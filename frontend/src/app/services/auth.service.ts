import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
} from '../features/profile/interfaces/login.interface';
import { AuthApiService } from '../features/profile/backend-services/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_STORAGE_KEY = 'socialtrackr_user';
  private readonly TOKEN_STORAGE_KEY = 'socialtrackr_token';

  // Signal pour l'état d'authentification
  private _isAuthenticatedSignal = signal<boolean>(
    this.hasValidStoredCredentials()
  );

  // Référence au signal comme propriété en lecture seule
  readonly isAuthenticated$ = this._isAuthenticatedSignal.asReadonly();

  private _router = inject(Router);
  private _authApiService = inject(AuthApiService);

  /**
   * Authentifie un utilisateur via le service d'API
   * @param credentials Informations de connexion (email, password)
   * @returns Observable contenant la réponse du serveur
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this._authApiService.login(credentials).pipe(
      tap((response) => {
        if (response.success && response.user) {
          // Stockage de l'utilisateur et mise à jour du signal
          this.storeUserData(response.user);
          this._isAuthenticatedSignal.set(true);
        }
      })
    );
  }

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    // Suppression des données stockées
    localStorage.removeItem(this.USER_STORAGE_KEY);
    localStorage.removeItem(this.TOKEN_STORAGE_KEY);

    // Mise à jour du signal
    this._isAuthenticatedSignal.set(false);

    // Redirection vers la page de connexion
    this._router.navigate(['/login']);
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   * @returns true si l'utilisateur est authentifié, false sinon
   */
  isAuthenticated(): boolean {
    return this._isAuthenticatedSignal();
  }

  /**
   * Récupère les données de l'utilisateur stockées
   * @returns Les données utilisateur ou null si non connecté
   */
  getCurrentUser(): any {
    const userData = localStorage.getItem(this.USER_STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Stocke les données de l'utilisateur dans le localStorage
   * @param userData Les données utilisateur à stocker
   */
  private storeUserData(userData: any): void {
    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(userData));
  }

  /**
   * Vérifie si des identifiants valides sont stockés dans le localStorage
   * @returns true si des identifiants valides sont stockés, false sinon
   */
  private hasValidStoredCredentials(): boolean {
    const userData = localStorage.getItem(this.USER_STORAGE_KEY);
    return !!userData;
  }
}

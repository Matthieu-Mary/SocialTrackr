import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  LoginFormComponent,
  LoginFormData,
} from '../../components/login-form/login-form.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login-container',
  standalone: true,
  imports: [CommonModule, LoginFormComponent, HttpClientModule],
  templateUrl: './login-container.component.html',
})
export class LoginContainerComponent {
  loginInProgress = false;
  loginError: string | null = null;
  returnUrl: string = '/dashboard';

  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _authService = inject(AuthService);

  constructor() {
    // Récupération de l'URL de retour si elle existe dans les paramètres de requête
    this._route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] || this.returnUrl;
    });

    // Redirection si déjà authentifié
    if (this._authService.isAuthenticated()) {
      this._router.navigate([this.returnUrl]);
    }
  }

  handleLogin(credentials: LoginFormData): void {
    this.loginInProgress = true;
    this.loginError = null;

    this._authService.login(credentials).subscribe({
      next: (response) => {
        this.loginInProgress = false;

        if (response.success) {
          // Redirection vers la page d'accueil ou l'URL de retour
          this._router.navigate([this.returnUrl]);
        } else {
          // Dans le cas où le backend renvoie success: false
          this.loginError = response.error || 'Échec de la connexion';
        }
      },
      error: (error) => {
        this.loginInProgress = false;

        // Gestion des erreurs HTTP provenant du backend
        if (error?.error?.message) {
          this.loginError = error.error.message;
        } else if (error.status === 0) {
          this.loginError =
            'Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.';
        } else {
          this.loginError = 'Échec de la connexion';
        }
      },
    });
  }

  navigateToRegister(): void {
    this._router.navigate(['/register']);
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RegisterFormComponent,
  RegisterFormData,
} from '../../components/register-form/register-form.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';
import { AuthApiService } from '../../backend-services/auth-api.service';

@Component({
  selector: 'app-register-container',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent, HttpClientModule],
  templateUrl: './register-container.component.html',
})
export class RegisterContainerComponent {
  registrationInProgress = false;
  registrationError: string | null = null;

  private _router = inject(Router);
  private _authApiService = inject(AuthApiService);

  handleRegistration(formData: RegisterFormData): void {
    this.registrationInProgress = true;
    this.registrationError = null;

    // Suppression du champ confirmPassword qui n'est pas nécessaire pour le backend
    const { confirmPassword, ...userData } = formData;

    // Envoi des données au service d'inscription
    this._authApiService.register(userData).subscribe({
      next: (response) => {
        this.registrationInProgress = false;

        if (response.success) {
          // Stockage éventuel des informations utilisateur ou du token
          console.log('Inscription réussie!', response.user);

          // Redirection vers la page de connexion
          this._router.navigate(['/login']);
        } else {
          // Dans le cas où le backend renvoie success: false
          this.registrationError =
            response.error || "Une erreur est survenue lors de l'inscription";
        }
      },
      error: (error) => {
        this.registrationInProgress = false;

        // Gestion des erreurs HTTP provenant directement du backend
        if (error?.error?.message) {
          this.registrationError = error.error.message;
        } else if (error.status === 0) {
          this.registrationError =
            'Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.';
        } else {
          this.registrationError =
            "Une erreur est survenue lors de l'inscription";
        }
      },
    });
  }

  handleCancel(): void {
    // Redirection vers la page de login
    this._router.navigate(['/login']);
  }
}

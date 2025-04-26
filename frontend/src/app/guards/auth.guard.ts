import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Vérifier si l'utilisateur est connecté
  if (authService.isAuthenticated()) {
    return true;
  }

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

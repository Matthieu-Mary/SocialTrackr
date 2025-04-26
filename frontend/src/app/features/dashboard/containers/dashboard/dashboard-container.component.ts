import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-container.component.html',
})
export class DashboardContainerComponent {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  currentUser = this._authService.getCurrentUser();

  logout(): void {
    this._authService.logout();
    // La redirection est gérée dans le service d'authentification
  }
}

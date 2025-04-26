import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import(
        './features/profile/containers/register/register-container.component'
      ).then((m) => m.RegisterContainerComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import(
        './features/profile/containers/login/login-container.component'
      ).then((m) => m.LoginContainerComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import(
        './features/dashboard/containers/dashboard/dashboard-container.component'
      ).then((m) => m.DashboardContainerComponent),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

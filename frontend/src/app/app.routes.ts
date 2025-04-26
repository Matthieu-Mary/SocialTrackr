import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import(
        './features/profile/containers/register/register-container.component'
      ).then((m) => m.RegisterContainerComponent),
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
];

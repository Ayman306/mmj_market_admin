import { Routes } from '@angular/router';
import { LayoutComponent } from './page/layout/layout.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./page/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [authGuard],
    loadChildren: () =>
      import('./page/layout/admin.routes').then((m) => m.adminRoutes),
  },
];

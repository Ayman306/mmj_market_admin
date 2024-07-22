import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./page/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./page/layout/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'job',
    loadComponent: () =>
      import('./page/layout/job/job.component').then((c) => c.JobComponent),
  },
  {
    path: 'category',
    loadComponent: () =>
      import('./page/layout/category/category.component').then(
        (c) => c.CategoryComponent
      ),
  },
  {
    path: 'business',
    loadComponent: () =>
      import('./page/layout/business/business.component').then(
        (c) => c.BusinessComponent
      ),
  },
];

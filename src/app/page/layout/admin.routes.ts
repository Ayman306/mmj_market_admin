import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'job',
    loadComponent: () =>
      import('./job/job.component').then((c) => c.JobComponent),
  },
  {
    path: 'category',
    loadComponent: () =>
      import('./category/category.component').then((c) => c.CategoryComponent),
  },
  {
    path: 'business',
    loadComponent: () =>
      import('./business/business.component').then((c) => c.BusinessComponent),
  },
  {
    path: 'admin-access',
    loadComponent: () =>
      import('./admin-access/admin-access.component').then(
        (c) => c.AdminAccessComponent
      ),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

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
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

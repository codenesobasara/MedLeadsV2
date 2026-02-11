import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadComponent: () => import('./components/login/login').then(m => m.Login) },

  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboards/shell/shell').then(m => m.Shell),
    children: [
      { path: 'host', loadComponent: () => import('./components/Ui/Host/hostaction-cards/hostaction-cards').then(m => m.HostactionCards) },
      { path: 'vendor', loadComponent: () => import('./components/Ui/vendor/vendor-action-card/vendor-action-card').then(m => m.VendorActionCard) },
      {path: 'vendor/events/:eventId/dashboard', loadComponent: () => import('./components/Ui/vendor/vendor-kpi-cards/vendor-kpi-cards').then(m=>m.VendorKpiCards)},
      {path:'vendor/events/:eventId/team/dashboard', loadComponent:()=> import('./components/Ui/vendor/team-mangement/team-mangement').then(m=> m.TeamMangement)},
      {path:'vendor/reps/:repId/insights', loadComponent:()=>import('./components/Ui/vendor/rep-insights/rep-insights').then(m=> m.RepInsights)}
    ],
  },
];
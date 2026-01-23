import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path:'login', loadComponent: () => import('./components/login/login').then(m => m.Login) },

    {path:'dashboard',
        loadComponent: () => import('./components/dashboards/shell/shell').then(m => m.Shell),
    }
];

import { Routes } from '@angular/router';
import { AuthGuard } from '@core/authentication'
import { Error403Component } from '@routes/sessions/403.component';
import { Error404Component } from '@routes/sessions/404.component';
import { Error500Component } from '@routes/sessions/500.component';
import { LoginComponent } from '@routes/sessions/login/login.component';
import { DashboardComponent } from '@routes/dashboard/dashboard.component';
import { AuthLayoutComponent } from '@theme/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from '@theme/admin-layout/admin-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ],
  },
  { path: '', redirectTo: 'sistema', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
  {
    path: 'sistema',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: '403', component: Error403Component },
      { path: '404', component: Error404Component },
      { path: '500', component: Error500Component },
      {
        path: 'utilities',
        loadChildren: () => import('@routes/utilities/utilities.routes').then(m => m.routes),
      },
      {
        path: 'herramientas',
        loadChildren: () => import('@routes/herramientas/herramientas-routing.module').then(m => m.routes),
      },
      {
        path: 'costos-fijos',
        loadChildren: () => import('@routes/costos-fijos/costos-fijos-routing.module').then(m => m.routes)
      },
      {
        path: 'materias-primas',
        loadChildren: () => import('@routes/materias-primas/materias-primas-routing.module').then(m => m.routes)
      },
      {
        path: 'registros',
        loadChildren: () => import('@routes/registros/registros-routing.module').then(m => m.routes)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('@routes/usuarios/usuarios-routing.module').then(m => m.routes)
      }
    ],
  }
];

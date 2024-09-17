import { Routes } from '@angular/router';
import { DetalleHerramientasComponent } from './detalle-herramientas/detalle-herramientas.component'

export const routes: Routes = [
  { path: '', redirectTo: 'detalle', pathMatch: 'full' },
  { path: 'detalle', component: DetalleHerramientasComponent }
];

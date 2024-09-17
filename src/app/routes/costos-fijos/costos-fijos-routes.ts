import { Routes } from '@angular/router';
import { DetalleCostosFijosComponent } from './detalle-costos-fijos/detalle-costos-fijos.component'

export const routes: Routes = [
  { path: '', redirectTo: 'detalle', pathMatch: 'full' },
  { path: 'detalle', component: DetalleCostosFijosComponent }
];

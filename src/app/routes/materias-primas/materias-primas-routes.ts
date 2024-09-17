import { Routes } from '@angular/router';
import { DetalleMateriasPrimasComponent } from './detalle-materias-primas/detalle-materias-primas.component'

export const routes: Routes = [
  { path: '', redirectTo: 'detalle', pathMatch: 'full' },
  { path: 'detalle', component: DetalleMateriasPrimasComponent }
];

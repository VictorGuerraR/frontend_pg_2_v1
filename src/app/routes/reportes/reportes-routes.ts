import { Routes } from '@angular/router';
import { GananciaComponent } from './ganancia/ganancia.component'
import { DepreciacionComponent } from './depreciacion/depreciacion.component';


export const routes: Routes = [
  { path: '', redirectTo: 'depreciacion', pathMatch: 'full' },
  { path: 'depreciacion', component: DepreciacionComponent },
  { path: 'ganancia', component: GananciaComponent }
];


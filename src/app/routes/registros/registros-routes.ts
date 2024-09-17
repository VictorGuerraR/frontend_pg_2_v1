import { Routes } from '@angular/router';
import { DetalleRegistrosComponent } from './detalle-registros/detalle-registros.component';


export const routes: Routes = [
  { path: '', redirectTo: 'detalle', pathMatch: 'full' },
  { path: 'detalle', component: DetalleRegistrosComponent }
];


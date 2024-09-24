import { Routes } from '@angular/router';
import { DetalleRegistrosComponent } from './detalle-registros/detalle-registros.component';
import { DetalleCreacionRegistroComponent } from './creacion/detalle-creacion-registro/detalle-creacion-registro.component'


export const routes: Routes = [
  { path: '', redirectTo: 'detalle', pathMatch: 'full' },
  { path: 'detalle', component: DetalleRegistrosComponent },
  { path: 'creacion/:cod_maestro/:soloLectura', component: DetalleCreacionRegistroComponent }
];


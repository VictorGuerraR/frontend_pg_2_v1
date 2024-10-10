import { Injectable } from '@angular/core';
import { PeticionesHttpsService } from '@servicesTools/tools';

@Injectable({ providedIn: 'root' })
export class ReportesService {

  constructor(
    private peticionesHttpsServ: PeticionesHttpsService
  ) { }

  obtenerReporteDepreciacion() {
    return this.peticionesHttpsServ.httpsGet('/reportes-depreciacion');
  }

  obtenerReporteGananciaPorUsuario(params: any) {
    return this.peticionesHttpsServ.httpsGet('/reportes-ganancias', params);
  }

}

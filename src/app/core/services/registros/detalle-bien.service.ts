import { Injectable } from '@angular/core';
import { PeticionesHttpsService } from '@servicesTools/tools'

@Injectable({ providedIn: 'root' })
export class DetalleBienService {

  private endpointBien = {
    get: '/registros-maestro/bien',
    post: '/registros-maestro/bien',
    delete: '/registros-maestro/bien'
  }

  constructor(
    private peticionesHttpsServ: PeticionesHttpsService
  ) { }

  obtenerDetalleBien(params: any) {
    return this.peticionesHttpsServ.httpsGet(this.endpointBien['get'], params)
  }

  crearDetalleBien(params: any) {
    return this.peticionesHttpsServ.httpsPost(this.endpointBien['post'], params)
  }

  eliminarDetalleBien(params: any) {
    return this.peticionesHttpsServ.httpsDelete(this.endpointBien['delete'], params)
  }

}

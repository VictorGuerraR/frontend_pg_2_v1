import { Injectable } from '@angular/core';
import { Paginacion } from '@interfaces/pagination'
import { PeticionesHttpsService } from '@servicesTools/tools'

@Injectable({ providedIn: 'root' })
export class RegistrosService {

  private endpointMaestro = {
    get: '/registros-maestro',
    post: '/registros-maestro',
    delete: '/registros-maestro'
  }

  private endpointBien = {
    get: '/registros-maestro/bien',
    post: '/registros-maestro/bien',
    delete: '/registros-maestro/bien'
  }

  private endpointServicio = {
    get: '//registros-maestro/servicio',
    post: '//registros-maestro/servicio',
    delete: '//registros-maestro/servicio'
  }

  constructor(
    private peticionesHttpsServ: PeticionesHttpsService
  ) { }

  obtenerRegistrosMaestros(params: any) {
    return this.peticionesHttpsServ.httpsGet<Paginacion<any>>(this.endpointMaestro['get'], params)
  }

  crearRegistrosMaestros(params: any) {
    return this.peticionesHttpsServ.httpsPost(this.endpointMaestro['post'], params)
  }

  eliminarRegistrosMaestros(params: any) {
    return this.peticionesHttpsServ.httpsDelete(this.endpointMaestro['delete'], params)
  }

}

import { Injectable } from '@angular/core'; 
import { PeticionesHttpsService } from '@servicesTools/tools'

@Injectable({ providedIn: 'root' })
export class DetalleServiciosService {

  private endpointServicio = {
    get: '//registros-maestro/servicio',
    post: '//registros-maestro/servicio',
    delete: '//registros-maestro/servicio'
  }

  constructor(
    private peticionesHttpsServ: PeticionesHttpsService
  ) { }

  obtenerDetalleServicios(params: any) {
    return this.peticionesHttpsServ.httpsGet(this.endpointServicio['get'], params)
  }

  crearDetalleServicios(params: any) {
    return this.peticionesHttpsServ.httpsPost(this.endpointServicio['post'], params)
  }

  eliminarDetalleServicios(params: any) {
    return this.peticionesHttpsServ.httpsDelete(this.endpointServicio['delete'], params)
  }

}

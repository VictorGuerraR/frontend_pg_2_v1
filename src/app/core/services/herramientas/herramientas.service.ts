import { Injectable } from '@angular/core';
import { Paginacion } from '@interfaces/pagination'
import { PeticionesHttpsService } from '@servicesTools/tools'

@Injectable({ providedIn: 'root' })
export class HerramientasService {

  private endpointHerramientas = {
    get: '/herramientas',
    post: '/herramientas',
    patch: '/herramientas',
    delete: '/herramientas'
  }

  constructor(
    private peticionesHttpsServ: PeticionesHttpsService
  ) { }

  obtenerHerramientas(params: any) {
    return this.peticionesHttpsServ.httpsGet<Paginacion<any>>(this.endpointHerramientas['get'], params)
  }

  crearHerramientas(herramienta: any) {
    return this.peticionesHttpsServ.httpsPost(this.endpointHerramientas['post'], herramienta)
  }

  actualizarHerramientas(herramienta: any) {
    return this.peticionesHttpsServ.httpsPatch(this.endpointHerramientas['patch'], herramienta)
  }

  eliminarHerramientas(herramienta: any) {
    return this.peticionesHttpsServ.httpsDelete(this.endpointHerramientas['delete'], herramienta)
  }
}

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Paginacion } from '@interfaces/pagination'
import { PeticionesHttpsService } from '@servicesTools/tools'

@Injectable({
  providedIn: 'root'
})
export class MateriasPrimasService {

  private endpointHerramientas = {
    get: '/materias-primas',
    post: '/materias-primas',
    patch: '/materias-primas',
    delete: '/materias-primas',
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

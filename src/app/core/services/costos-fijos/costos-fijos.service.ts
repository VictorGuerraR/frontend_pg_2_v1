import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Paginacion } from '@interfaces/pagination'
import { PeticionesHttpsService } from '@servicesTools/tools'

@Injectable({ providedIn: 'root' })
export class CostosFijosService {

  private endpointCostosFijos = {
    get: '/costos-fijos',
    post: '/costos-fijos',
    patch: '/costos-fijos',
    delete: '/costos-fijos'
  }

  constructor(
    private toastServ: ToastrService,
    private peticionesHttpsServ: PeticionesHttpsService
  ) { }

  obtenerCostosFijos(params: any) {
    return this.peticionesHttpsServ.httpsGet<Paginacion<any>>(this.endpointCostosFijos['get'], params)
  }

  crearCostosFijos(costoFijo: any) {
    return this.peticionesHttpsServ.httpsPost(this.endpointCostosFijos['post'], costoFijo)
  }

  actualizarCostosFijos(costoFijo: any) {
    return this.peticionesHttpsServ.httpsPatch(this.endpointCostosFijos['patch'], costoFijo)
  }

  eliminarCostoFijos(costoFijo: any) {
    return this.peticionesHttpsServ.httpsDelete(this.endpointCostosFijos['delete'], costoFijo)
  }
}

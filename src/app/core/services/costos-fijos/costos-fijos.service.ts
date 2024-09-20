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
    this.peticionesHttpsServ.httpsPost(this.endpointCostosFijos['post'], costoFijo)
      .then(() => this.toastServ.success('Se ha creado el registro.', 'Creación'))
      .catch(() => this.toastServ.error('No fue posible crear el registro.', 'Error en Creación'))
  }

  actualizarCostosFijos(costoFijo: any) {
    this.peticionesHttpsServ.httpsPatch(this.endpointCostosFijos['patch'], costoFijo)
      .then(() => this.toastServ.info('Se ha actualizado el registro.', 'Actualización'))
      .catch(() => this.toastServ.error('No fue posible actualizar el registro.', 'Error en Actualizacioón'))
  }

  eliminarCostoFijos(costoFijo: any) {
    this.peticionesHttpsServ.httpsDelete(this.endpointCostosFijos['delete'], costoFijo)
      .then(() => this.toastServ.warning('Se ha eliminado el registro.', 'Eliminación'))
      .catch(() => this.toastServ.error('No fue posible eliminar el registro.', 'Error en Eliminación'))

  }
}

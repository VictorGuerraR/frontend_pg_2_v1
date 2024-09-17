import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PeticionesHttpsService } from '@servicesTools/tools'

@Injectable({ providedIn: 'root' })
export class CostosFijosService {

  endpointsCostosFijos = {
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
    return this.peticionesHttpsServ.httpsGet(this.endpointsCostosFijos['get'], params)
  }

  crearCostosFijos(costoFijo: any) {
    this.peticionesHttpsServ.httpsPost(this.endpointsCostosFijos['post'], costoFijo)
      .then(() => this.toastServ.success('Se ha creado el registro.', 'Creación'))
      .catch(() => this.toastServ.error('No fue posible crear el registro.', 'Error en Creación'))
  }

  actualizarCostosFijos(costoFijo: any) {
    this.peticionesHttpsServ.httpsPatch(this.endpointsCostosFijos['patch'], costoFijo)
      .then(() => this.toastServ.info('Se ha actualizado el registro.', 'Actualización'))
      .catch(() => this.toastServ.error('No fue posible actualizar el registro.', 'Error en Actualizacioón'))
  }

  eliminarCostoFijos(costoFijo: any) {
    this.peticionesHttpsServ.httpsDelete(this.endpointsCostosFijos['delete'], costoFijo)
      .then(() => this.toastServ.warning('Se ha eliminado el registro.', 'Eliminación'))
      .catch(() => this.toastServ.error('No fue posible eliminar el registro.', 'Error en Eliminación'))

  }
}

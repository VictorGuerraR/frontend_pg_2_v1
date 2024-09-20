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
    private toastServ: ToastrService,
    private peticionesHttpsServ: PeticionesHttpsService
  ) { }

  obtenerHerramientas(params: any) {
    return this.peticionesHttpsServ.httpsGet<Paginacion<any>>(this.endpointHerramientas['get'], params)
  }

  crearHerramientas(herramienta: any) {
    this.peticionesHttpsServ.httpsPost(this.endpointHerramientas['post'], herramienta)
      .then(() => this.toastServ.success('Se ha creado el registro.', 'Creación'))
      .catch(() => this.toastServ.error('No fue posible crear el registro.', 'Error en Creación'))
  }

  actualizarHerramientas(herramienta: any) {
    this.peticionesHttpsServ.httpsPatch(this.endpointHerramientas['patch'], herramienta)
      .then(() => this.toastServ.info('Se ha actualizado el registro', 'Actualización'))
      .catch(() => this.toastServ.error('No fue posible actualizar el registro.', 'Error en Actualización'))
  }

  eliminarHerramientas(herramienta: any) {
    this.peticionesHttpsServ.httpsDelete(this.endpointHerramientas['delete'], herramienta)
      .then(() => this.toastServ.warning('Se ha eliminado el registro.', 'Eliminación'))
      .catch(() => this.toastServ.error('No fue posible eliminar el registro.', 'Error en Eliminación'))
  }

}

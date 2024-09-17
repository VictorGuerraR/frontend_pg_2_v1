import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PeticionesHttpsService } from '@servicesTools/tools'

@Injectable({ providedIn: 'root' })
export class UsuariosService {

  endpointUsuarios = {
    post: '/loggin-create',
    patch: '/loggin-update',
    delete: '/loggin-inactive',
  }

  constructor(
    private toastServ: ToastrService,
    private peticionesHttpsServ: PeticionesHttpsService
  ) { }

  crearUsuario(usuario: any) {
    this.peticionesHttpsServ.httpsPost(this.endpointUsuarios['post'], usuario)
      .then(() => this.toastServ.success('Se ha creado el registro.', 'Creación'))
      .catch(() => this.toastServ.error('No fue posible crear el registro.', 'Error en Creación'))
  }

  actualizarUsuario(usuario: any) {
    this.peticionesHttpsServ.httpsPatch(this.endpointUsuarios['patch'], usuario)
      .then(() => this.toastServ.info('Se ha actualizado el registro', 'Actualización'))
      .catch(() => this.toastServ.error('No fue posible actualizar el registro.', 'Error en Actualización'))
  }

}

import { Injectable } from '@angular/core';
import { Paginacion } from '@interfaces/pagination'
import { DetalleBienService } from './detalle-bien.service';
import { PeticionesHttpsService } from '@servicesTools/tools';
import { DetalleServiciosService } from './detalle-servicios.service';
import { Estrategias } from '@interfaces/strategies'

@Injectable({ providedIn: 'root' })
export class RegistrosService {

  private endpointMaestro = {
    get: '/registros-maestro',
    post: '/registros-maestro',
    patch: '/registros-maestro',
    delete: '/registros-maestro',
    getEncabezado: '/registros-maestro/encabezado'
  }

  strategies: Estrategias = {
    bienes: {
      creacion: (value: any) => this.detalleBienServ.crearDetalleBien(value),
      eliminacion: (value: any) => this.detalleBienServ.eliminarDetalleBien(value),
      obtener: (value: any) => this.detalleBienServ.obtenerDetalleBien(value)
    },
    servicios: {
      creacion: (value: any) => this.detalleServicioServ.crearDetalleServicios(value),
      eliminacion: (value: any) => this.detalleServicioServ.eliminarDetalleServicios(value),
      obtener: (value: any) => this.detalleServicioServ.obtenerDetalleServicios(value)
    },
  }

  constructor(
    private detalleBienServ: DetalleBienService,
    private detalleServicioServ: DetalleServiciosService,
    private peticionesHttpsServ: PeticionesHttpsService
  ) { }

  obtenerRegistrosMaestros(params: any) {
    return this.peticionesHttpsServ.httpsGet<Paginacion<any>>(this.endpointMaestro['get'], params)
  }

  obtenerEncabezadoMaestro(params: any) {
    return this.peticionesHttpsServ.httpsGet(this.endpointMaestro['getEncabezado'], params)
  }

  crearRegistrosMaestros(params: any) {
    return this.peticionesHttpsServ.httpsPost(this.endpointMaestro['post'], params)
  }

  actualizarRegistrosMaestros(params: any) {
    return this.peticionesHttpsServ.httpsPatch(this.endpointMaestro['patch'], params)
  }

  eliminarRegistrosMaestros(params: any) {
    return this.peticionesHttpsServ.httpsDelete(this.endpointMaestro['delete'], params)
  }

}

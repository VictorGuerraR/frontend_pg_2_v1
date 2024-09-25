import { Injectable } from '@angular/core';
import { PeticionesHttpsService } from '@servicesTools/tools'

@Injectable({ providedIn: 'root' })
export class CatalogosService {

  constructor(
    private peticionesHttpsServ: PeticionesHttpsService
  ) { }

  obtenerUsuarios<T>() { return this.peticionesHttpsServ.httpsGet<T>('/catalogo/usuarios') }
  obtenerHerramientas<T>() { return this.peticionesHttpsServ.httpsGet<T>('/catalogo/herramientas') }
  obtenerCostoFijoHora<T>() { return this.peticionesHttpsServ.httpsGet<T>('/catalogo/costosFijos') }
  obtenerMateriasPrimas<T>() { return this.peticionesHttpsServ.httpsGet<T>('/catalogo/materiasPrimas') }
  obtenerTipoDepreciacion<T>() { return this.peticionesHttpsServ.httpsGet<T>('/catalogo/tipoDepreciacion') }

}

import { Injectable } from '@angular/core';
import { PeticionesHttpsService } from '@servicesTools/tools'

@Injectable({ providedIn: 'root' })
export class CatalogosService {

  constructor(
    private peticionesHttpsServ: PeticionesHttpsService
  ) { }

  obtenerUsuarios() { return this.peticionesHttpsServ.httpsGet('/catalogo/usuarios') }
  obtenerHerramientas() { return this.peticionesHttpsServ.httpsGet('/catalogo/herramientas') }
  obtenerMateriasPrimas() { return this.peticionesHttpsServ.httpsGet('/catalogo/materiasPrimas') }
  obtenerTipoDepreciacion() { return this.peticionesHttpsServ.httpsGet('/catalogo/tipoDepreciacion') }

}

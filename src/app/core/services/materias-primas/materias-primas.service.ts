import { Injectable } from '@angular/core'; 
import { Paginacion } from '@interfaces/pagination';
import { PeticionesHttpsService } from '@servicesTools/tools';

@Injectable({
  providedIn: 'root'
})
export class MateriasPrimasService {

  private endpointMateriasPrimas = {
    get: '/materias-primas',
    post: '/materias-primas',
    patch: '/materias-primas',
    delete: '/materias-primas',
  }

  constructor(
    private peticionesHttpsServ: PeticionesHttpsService
  ) { }

  obtenerMateriasPrimas(params: any) {
    return this.peticionesHttpsServ.httpsGet<Paginacion<any>>(this.endpointMateriasPrimas['get'], params);
  }

  crearMateriasPrimas(materiaPrima: any) {
    return this.peticionesHttpsServ.httpsPost(this.endpointMateriasPrimas['post'], materiaPrima);
  }

  actualizarMateriasPrimas(materiaPrima: any) {
    return this.peticionesHttpsServ.httpsPatch(this.endpointMateriasPrimas['patch'], materiaPrima);
  }

  eliminarMateriasPrimas(materiaPrima: any) {
    return this.peticionesHttpsServ.httpsDelete(this.endpointMateriasPrimas['delete'], materiaPrima);
  }

}

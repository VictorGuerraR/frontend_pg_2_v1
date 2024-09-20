import { PaginatorModule } from 'primeng/paginator';
import { HerramientasService } from '@core/services';
import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from "@shared/components/toolbar/toolbar.component";
import { PaginationConfigurations } from '@shared/interfaces/paginationConfigurations';
import { TablaHerramientasComponent } from "../tabla-herramientas/tabla-herramientas.component";


@Component({
  selector: 'detalle-herramientas',
  standalone: true,
  imports: [PaginatorModule, ToolbarComponent, TablaHerramientasComponent],
  templateUrl: './detalle-herramientas.component.html',
  styles: ``
})
export class DetalleHerramientasComponent  implements OnInit {

  private readonly herramientasServ = inject(HerramientasService);
  paginacion: any;

  paginationConfigurations: PaginationConfigurations = {
    pageLimit: 10,
    totalRecords: 0,
    rowsPerPageOptions: [10, 20, 30]
  }

  herramientas: any

  ngOnInit(): void { this.solicitarInformacion() }

  async solicitarInformacion(params = {}) {
    await this.herramientasServ.obtenerHerramientas(params)
      .then(({ respuesta }: any) => {
        const { pageInformation, results } = respuesta
        this.herramientas = results

        this.paginacion = pageInformation
        this.paginationConfigurations.totalRecords = pageInformation.totalElements
      })
      .catch(() => this.herramientas = [])
  }

  async handlePagination(event: any) {
    let { page, rows: limit } = event;
    page += 1
    await this.solicitarInformacion({ page, limit })
  }
}

import { PaginatorModule } from 'primeng/paginator';
import { RegistrosService } from '@core/services';
import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from "@shared/components/toolbar/toolbar.component";
import { PaginationConfigurations } from '@shared/interfaces/paginationConfigurations';
import { TablaRegistrosComponent } from "../tabla-registros/tabla-registros.component";


@Component({
  selector: 'detalle-registros',
  standalone: true,
  imports: [PaginatorModule, ToolbarComponent, TablaRegistrosComponent],
  templateUrl: './detalle-registros.component.html',
  styles: ``
})
export class DetalleRegistrosComponent {

  private readonly registrosServ = inject(RegistrosService);
  paginacion: any;

  paginationConfigurations: PaginationConfigurations = {
    pageLimit: 10,
    totalRecords: 0,
    rowsPerPageOptions: [10, 20, 30]
  }

  herramientas: any

  ngOnInit(): void { this.solicitarInformacion() }

  async solicitarInformacion(params = {}) {
    await this.registrosServ.obtenerRegistrosMaestros(params)
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

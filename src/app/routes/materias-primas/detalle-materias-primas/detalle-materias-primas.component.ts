import { PaginatorModule } from 'primeng/paginator';
import { MateriasPrimasService } from '@core/services';
import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from "@shared/components/toolbar/toolbar.component";
import { PaginationConfigurations } from '@shared/interfaces/paginationConfigurations';
import { TablaMateriasPrimasComponent } from "../tabla-materias-primas/tabla-materias-primas.component";


@Component({
  selector: 'detalle-materias-primas',
  standalone: true,
  imports: [PaginatorModule, ToolbarComponent, TablaMateriasPrimasComponent],
  templateUrl: './detalle-materias-primas.component.html',
  styles: ``
})
export class DetalleMateriasPrimasComponent {
  private readonly materiasPrimasServ = inject(MateriasPrimasService);

  paginacion: any;

  paginationConfigurations: PaginationConfigurations = {
    pageLimit: 10,
    totalRecords: 0,
    rowsPerPageOptions: [10, 20, 30]
  }

  herramientas: any

  ngOnInit(): void { this.solicitarInformacion() }

  async solicitarInformacion(params = {}) {
    await this.materiasPrimasServ.obtenerHerramientas(params)
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

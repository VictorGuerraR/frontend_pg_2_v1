import { CostosFijosService } from '@services'
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from "@shared/components/toolbar/toolbar.component";
import { PaginationConfigurations } from '@shared/interfaces/paginationConfigurations';
import { FormCostosFijosComponent } from "../form-costos-fijos/form-costos-fijos.component";
import { TablaCostosFijosComponent } from "../tabla-costos-fijos/tabla-costos-fijos.component";

@Component({
  selector: 'detalle-costos-fijos',
  standalone: true,
  imports: [
    PaginatorModule,
    FormCostosFijosComponent,
    TablaCostosFijosComponent,
    ToolbarComponent,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './detalle-costos-fijos.component.html',
  styles: ``
})
export class DetalleCostosFijosComponent implements OnInit {
  private readonly costoFijosServ = inject(CostosFijosService);

  paginacion: any;
  costosfijos: any;
  costofijoSeleccionado: any;
  nuevoFlag: boolean = false
  edicionFlag: boolean = false

  paginationConfigurations: PaginationConfigurations = {
    pageLimit: 10,
    totalRecords: 0,
    rowsPerPageOptions: [10, 20, 30]
  }

  ngOnInit(): void { this.solicitarInformacion() }

  async solicitarInformacion(params = {}) {
    await this.costoFijosServ.obtenerCostosFijos(params)
      .then(({ respuesta }: any) => {
        const { pageInformation, results } = respuesta
        this.costosfijos = results

        this.paginacion = pageInformation
        this.paginationConfigurations.totalRecords = pageInformation.totalElements
      })
      .catch(() => this.costosfijos = [])
  }

  async handlePagination(event: any) {
    let { page, rows: limit } = event;
    page += 1
    await this.solicitarInformacion({ page, limit })
  }

  edicion(data:any){}
  vista(data:any){}
  eliminacion(data:any){}
}

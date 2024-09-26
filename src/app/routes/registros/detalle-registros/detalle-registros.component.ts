import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrosService } from '@core/services';
import { PaginatorModule } from 'primeng/paginator';
import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from "@shared/components/toolbar/toolbar.component";
import { PaginationConfigurations } from '@shared/interfaces/paginationConfigurations';
import { TablaRegistrosComponent } from "../tabla-registros/tabla-registros.component";

@Component({
  selector: 'detalle-registros',
  standalone: true,
  imports: [
    PaginatorModule,
    ToolbarComponent,
    TablaRegistrosComponent
  ],
  templateUrl: './detalle-registros.component.html',
  styles: ``
})
export class DetalleRegistrosComponent {
  private readonly router = inject(Router)
  private readonly toastServ = inject(ToastrService)
  private readonly registrosServ = inject(RegistrosService);

  paginacion: any;
  registros: any

  paginationConfigurations: PaginationConfigurations = {
    pageLimit: 10,
    totalRecords: 0,
    rowsPerPageOptions: [10, 20, 30]
  }

  ngOnInit(): void { this.solicitarInformacion({ activo: true }) }

  async solicitarInformacion(params = {}) {
    await this.registrosServ.obtenerRegistrosMaestros(params)
      .then(({ respuesta }: any) => {
        const { pageInformation, results } = respuesta
        this.registros = results
        this.paginacion = pageInformation
        this.paginationConfigurations.totalRecords = pageInformation.totalElements
      })
      .catch(() => this.registros = [])
  }

  async handlePagination(event: any) {
    let { page, rows: limit } = event;
    page += 1
    await this.solicitarInformacion({ page, limit, activo: true })
  }

  navegar(data: any, soloLectura: boolean) {
    const { cod_maestro } = data
    this.router.navigate(
      ['sistema', 'registros', 'creacion', cod_maestro, soloLectura],
      // { skipLocationChange: soloLectura }
    )
  }

  async eliminacion(data: any) {
    const { cod_maestro } = data
    await this.registrosServ.eliminarRegistrosMaestros({ cod_maestro })
      .then(() => this.toastServ.warning('Se ha eliminado el registro.', 'Eliminación'))
      .catch(() => this.toastServ.error('No fue posible eliminar el registro.', 'Error en Eliminación'))
      .finally(() => this.solicitarInformacion({ activo: true }))
  }

}

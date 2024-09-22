import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { HerramientasService } from '@core/services';
import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from "@shared/components/toolbar/toolbar.component";
import { PaginationConfigurations } from '@shared/interfaces/paginationConfigurations';
import { TablaHerramientasComponent } from "../tabla-herramientas/tabla-herramientas.component";
import { FormHerramientasComponent } from "../form-herramientas/form-herramientas.component";

@Component({
  selector: 'detalle-herramientas',
  standalone: true,
  templateUrl: './detalle-herramientas.component.html',
  imports: [
    DialogModule,
    PaginatorModule,
    ToolbarComponent,
    TablaHerramientasComponent,
    FormHerramientasComponent
  ],
  styles: ``
})
export class DetalleHerramientasComponent implements OnInit {
  private readonly toastServ = inject(ToastrService)
  private readonly herramientasServ = inject(HerramientasService);

  paginacion: any;
  herramientas: any
  herramientaSeleccionada: any
  vistaFlag: boolean = false
  nuevoFlag: boolean = false
  edicionFlag: boolean = false

  paginationConfigurations: PaginationConfigurations = {
    pageLimit: 10,
    totalRecords: 0,
    rowsPerPageOptions: [10, 20, 30]
  }

  ngOnInit(): void { this.solicitarInformacion({ activo: true }) }

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
    await this.solicitarInformacion({ page, limit, activo: true })
  }

  vista(data: any) { this.herramientaSeleccionada = data; this.vistaFlag = true }

  edicion(data: any) { this.herramientaSeleccionada = data; this.edicionFlag = true; }

  async creacion(data: any) {
    await this.herramientasServ.crearHerramientas(data)
      .then(() => this.toastServ.success('Se ha creado el registro.', 'Creación'))
      .catch(() => this.toastServ.error('No fue posible crear el registro.', 'Error en Creación'))
      .finally(() => this.solicitarInformacion({ activo: true }))
  }

  async actualizacion(data: any) {
    await this.herramientasServ.actualizarHerramientas(data)
      .then(() => this.toastServ.info('Se ha actualizado el registro.', 'Actualización'))
      .catch(() => this.toastServ.error('No fue posible actualizar el registro.', 'Error en Actualización'))
      .finally(() => this.solicitarInformacion({ activo: true }))
  }

  async eliminacion(data: any) {
    const { cod_herramienta } = data
    await this.herramientasServ.eliminarHerramientas({ cod_herramienta })
      .then(() => this.toastServ.warning('Se ha eliminado el registro.', 'Eliminación'))
      .catch(() => this.toastServ.error('No fue posible eliminar el registro.', 'Error en Eliminación'))
      .finally(() => this.solicitarInformacion({ activo: true }))
  }
}

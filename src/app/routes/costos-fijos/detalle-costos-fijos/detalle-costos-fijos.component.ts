import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { CostosFijosService } from '@services';
import { PaginatorModule } from 'primeng/paginator';
import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from "@shared/components/toolbar/toolbar.component";
import { PaginationConfigurations } from '@shared/interfaces/paginationConfigurations';
import { FormCostosFijosComponent } from "../form-costos-fijos/form-costos-fijos.component";
import { TablaCostosFijosComponent } from "../tabla-costos-fijos/tabla-costos-fijos.component";

@Component({
  selector: 'detalle-costos-fijos',
  standalone: true,
  templateUrl: './detalle-costos-fijos.component.html',
  imports: [
    DialogModule,
    PaginatorModule,
    ToolbarComponent,
    FormCostosFijosComponent,
    TablaCostosFijosComponent
  ],
  styles: ``
})
export class DetalleCostosFijosComponent implements OnInit {
  private readonly toastServ = inject(ToastrService)
  private readonly costoFijosServ = inject(CostosFijosService);

  paginacion: any;
  costosfijos: any;
  costofijoSeleccionado: any;
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
    await this.solicitarInformacion({ page, limit, activo: true })
  }

  vista(data: any) { this.costofijoSeleccionado = data; this.vistaFlag = true }

  edicion(data: any) { this.costofijoSeleccionado = data; this.edicionFlag = true; }

  async creacion(data: any) {
    await this.costoFijosServ.crearCostosFijos(data)
      .then(() => {
        this.toastServ.success('Se ha creado el registro.', 'Creación')
        this.nuevoFlag = false
      })
      .catch(() => this.toastServ.error('No fue posible crear el registro.', 'Error en Creación'))
      .finally(() => this.solicitarInformacion({ activo: true }))
  }

  async actualizacion(data: any) {
    await this.costoFijosServ.actualizarCostosFijos(data)
      .then(() => {
        this.toastServ.info('Se ha actualizado el registro.', 'Actualización')
        this.edicionFlag = false
      })
      .catch(() => this.toastServ.error('No fue posible actualizar el registro.', 'Error en Actualización'))
      .finally(() => this.solicitarInformacion({ activo: true }))
  }

  async eliminacion(data: any) {
    const { cod_costo_fijo } = data
    await this.costoFijosServ.eliminarCostoFijos({ cod_costo_fijo })
      .then(() => this.toastServ.warning('Se ha eliminado el registro.', 'Eliminación'))
      .catch(() => this.toastServ.error('No fue posible eliminar el registro.', 'Error en Eliminación'))
      .finally(() => this.solicitarInformacion({ activo: true }))
  }

}

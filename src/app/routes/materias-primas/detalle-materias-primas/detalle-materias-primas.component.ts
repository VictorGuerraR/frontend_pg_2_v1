import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { MateriasPrimasService } from '@core/services';
import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from "@shared/components/toolbar/toolbar.component";
import { PaginationConfigurations } from '@shared/interfaces/paginationConfigurations';
import { TablaMateriasPrimasComponent } from "../tabla-materias-primas/tabla-materias-primas.component";
import { FormMateriasPrimasComponent } from "../form-materias-primas/form-materias-primas.component";


@Component({
  selector: 'detalle-materias-primas',
  standalone: true,
  templateUrl: './detalle-materias-primas.component.html',
  imports: [
    DialogModule,
    PaginatorModule,
    ToolbarComponent,
    TablaMateriasPrimasComponent,
    FormMateriasPrimasComponent
  ],
  styles: ``
})
export class DetalleMateriasPrimasComponent {
  private readonly toastServ = inject(ToastrService)
  private readonly materiasPrimasServ = inject(MateriasPrimasService);

  paginacion: any;
  materiasPrimas: any;
  materiasPrimasSeleccionada: any;
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
    await this.materiasPrimasServ.obtenerMateriasPrimas(params)
      .then(({ respuesta }: any) => {
        const { pageInformation, results } = respuesta
        this.materiasPrimas = results
        this.paginacion = pageInformation
        this.paginationConfigurations.totalRecords = pageInformation.totalElements
      })
      .catch(() => this.materiasPrimas = [])
  }

  async handlePagination(event: any) {
    let { page, rows: limit } = event;
    page += 1
    await this.solicitarInformacion({ page, limit, activo: true })
  }

  vista(data: any) { this.materiasPrimasSeleccionada = data; this.vistaFlag = true }

  edicion(data: any) { this.materiasPrimasSeleccionada = data; this.edicionFlag = true; }

  async creacion(data: any) {
    await this.materiasPrimasServ.crearMateriasPrimas(data)
      .then(() => {
        this.toastServ.success('Se ha creado el registro.', 'Creación')
        this.nuevoFlag = false
      })
      .catch(() => this.toastServ.error('No fue posible crear el registro.', 'Error en Creación'))
      .finally(() => this.solicitarInformacion({ activo: true }))
  }

  async actualizacion(data: any) {
    await this.materiasPrimasServ.actualizarMateriasPrimas(data)
      .then(() => {
        this.toastServ.info('Se ha actualizado el registro.', 'Actualización')
        this.edicionFlag = false
      })
      .catch(() => this.toastServ.error('No fue posible actualizar el registro.', 'Error en Actualización'))
      .finally(() => this.solicitarInformacion({ activo: true }))
  }

  async eliminacion(data: any) {
    const { cod_materia_prima } = data
    await this.materiasPrimasServ.eliminarMateriasPrimas({ cod_materia_prima })
      .then(() => this.toastServ.warning('Se ha eliminado el registro.', 'Eliminación'))
      .catch(() => this.toastServ.error('No fue posible eliminar el registro.', 'Error en Eliminación'))
      .finally(() => this.solicitarInformacion({ activo: true }))
  }
}

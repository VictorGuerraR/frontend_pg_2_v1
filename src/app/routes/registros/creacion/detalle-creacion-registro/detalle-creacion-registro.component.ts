import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ActivatedRoute } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '@core/services';
import { FormBienComponent } from '../form-bien/form-bien.component';
import { TablaBienesComponent } from '../tabla-bienes/tabla-bienes.component';
import { FormMaestroComponent } from '../form-maestro/form-maestro.component';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { FormServicioComponent } from '../form-servicio/form-servicio.component';
import { TablaServiciosComponent } from '../tabla-servicios/tabla-servicios.component'
import { Estrategia, Estrategias } from '@interfaces/strategies';

@Component({
  selector: 'detalle-creacion-registro',
  styleUrl: './detalle-creacion-registro.component.scss',
  templateUrl: './detalle-creacion-registro.component.html',
  standalone: true,
  imports: [
    CardModule,
    DialogModule,
    TabViewModule,
    ToolbarComponent,
    FormBienComponent,
    TablaBienesComponent,
    FormMaestroComponent,
    FormServicioComponent,
    TablaServiciosComponent
  ],
})
export class DetalleCreacionRegistroComponent implements OnInit {

  codMaestro: number = 0;
  soloLectura: boolean = false;
  infoForm: any = null
  infoTablaBienes: any = []
  infoTablaServicios: any = []

  constructor(
    private router: Router,
    private routeActive: ActivatedRoute,
    private registrosServ: RegistrosService
  ) { }

  ngOnInit(): void {
    this.routeActive.params.subscribe((params: any) => {
      this.codMaestro = Number(params.cod_maestro || 0);
      this.soloLectura = params.soloLectura === 'true';
      if (this.codMaestro > 0) {
        this.solicitarInformacion()
      }
    });
  }

  async solicitarInformacion() {
    this.registrosServ.obtenerEncabezadoMaestro({ cod_maestro: this.codMaestro })
      .then((res: any) => { this.infoForm = res?.[0] })
      .catch(() => this.infoForm = null)
    this.solicitarInformacionTablas('bienes', { cod_maestro: this.codMaestro, activo: true })
    this.solicitarInformacionTablas('servicios', { cod_maestro: this.codMaestro, activo: true })
  }

  async solicitarInformacionTablas(strategy: keyof Estrategias, params = {}) {
    this.registrosServ.strategies[strategy].obtener(params)
      .then((respuesta: any) => {
        if (strategy == 'bienes') { this.infoTablaBienes = respuesta }
        else { this.infoTablaServicios = respuesta }
      }).catch(() => {
        if (strategy == 'bienes') { this.infoTablaBienes = [] }
        else { this.infoTablaServicios = [] }
      })
  }

  async operacionEncabezado(encabezado: any) {
    if (this.tipoOperacion() == 'creacion') {
      this.registrosServ.crearRegistrosMaestros(encabezado)
        .then((res: any) => this.router.navigate(['sistema', 'registros', 'creacion', res?.[0].cod_maestro, false]))
    } else {
      this.registrosServ.actualizarRegistrosMaestros(encabezado)
        .then((res: any) => {
          this.codMaestro = res?.[0].cod_maestro
          this.solicitarInformacion()
        })

    }

  }

  async operacionDetalles(strategy: keyof Estrategias, operacion: keyof Estrategia, data: any) {
    this.registrosServ.strategies[strategy][operacion](data)
      .then((res: any) => this.solicitarInformacionTablas(strategy))
  }

  eliminarBien({ cod_detalle_bien }: any) {
    this.operacionDetalles('bienes', 'eliminacion', { cod_detalle_bien })
  }

  eliminarServicio({ cod_detalle_servicio }: any) {
    this.operacionDetalles('servicios', 'eliminacion', { cod_detalle_servicio })
  }

  mensaje() {
    if (this.codMaestro > 0 && this.soloLectura == false) { return "Edición de Registro" }
    else if (this.codMaestro > 0 && this.soloLectura == true) { return "Vista de Registro" }
    else { return "Creación de Registro" }
  }

  tipoOperacion() {
    if (this.codMaestro > 0 && this.soloLectura == false) { return "actualizacion" }
    else if (this.codMaestro > 0 && this.soloLectura == true) { return "vista" }
    else { return "creacion" }
  }


}

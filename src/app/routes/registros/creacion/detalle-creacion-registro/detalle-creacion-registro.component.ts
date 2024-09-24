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
  infoTablaBienes: any = []
  infoTablaServicios: any = []

  constructor(
    private route: ActivatedRoute,
    private registrosServ: RegistrosService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.codMaestro = Number(params.cod_maestro || 0);
      this.soloLectura = params.soloLectura === 'true';
    });

    if (this.codMaestro > 0) {
      this.solicitarInformacion('bienes', { cod_maestro: this.codMaestro })
      this.solicitarInformacion('servicios', { cod_maestro: this.codMaestro })
    }
  }

  async solicitarInformacion(strategy: string, params = {}) {
    this.registrosServ.strategies[strategy].obtener(params)
      .then(({ respuesta }: any) => {
        if (strategy == 'bienes') {
          this.infoTablaBienes = respuesta
        } else {
          this.infoTablaServicios = respuesta
        }
      }).catch(() => {
        if (strategy == 'bienes') {
          this.infoTablaBienes = []
        } else {
          this.infoTablaServicios = []
        }
      })
  }

  mensaje() {
    if (this.codMaestro > 0 && this.soloLectura == false) { return "Edición de Registro" }
    else if (this.codMaestro > 0 && this.soloLectura == true) { return "Vista de Registro" }
    else { return "Creación de Registro" }
  }

}

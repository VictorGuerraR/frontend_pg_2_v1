import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBienComponent } from '../form-bien/form-bien.component';
import { FormMaestroComponent } from '../form-maestro/form-maestro.component';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { FormServicioComponent } from '../form-servicio/form-servicio.component';

@Component({
  selector: 'detalle-creacion-registro',
  styleUrl: './detalle-creacion-registro.component.scss',
  templateUrl: './detalle-creacion-registro.component.html',
  standalone: true,
  imports: [
    CardModule,
    DialogModule,
    ToolbarComponent,
    FormBienComponent,
    FormMaestroComponent,
    FormServicioComponent
  ],
})
export class DetalleCreacionRegistroComponent implements OnInit {

  codMaestro: number = 0;
  soloLectura: boolean = false;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.codMaestro = Number(params.cod_maestro || 0);
      this.soloLectura = params.soloLectura === 'true';
    });
  }

  mensaje() {
    if (this.codMaestro > 0 && this.soloLectura == false) { return "Edición de Registro" }
    else if (this.codMaestro > 0 && this.soloLectura == true) { return "Vista de Registro" }
    else { return "Creación de Registro" }
  }

}

import { CostosFijosService } from '@services'
import { Component, inject, OnInit } from '@angular/core';
import { FormCostosFijosComponent } from "../form-costos-fijos/form-costos-fijos.component";
import { TablaCostosFijosComponent } from "../tabla-costos-fijos/tabla-costos-fijos.component";

@Component({
  selector: 'detalle-costos-fijos',
  standalone: true,
  imports: [FormCostosFijosComponent, TablaCostosFijosComponent],
  templateUrl: './detalle-costos-fijos.component.html',
  styles: ``
})
export class DetalleCostosFijosComponent implements OnInit {

  private readonly costoFijosServ = inject(CostosFijosService);

  costosfijos: any

  ngOnInit(): void { this.solicitarInformacion() }

  async solicitarInformacion(params = {}) {
    await this.costoFijosServ.obtenerCostosFijos(params).then(({ respuesta }: any) => this.costosfijos = respuesta)
    console.log(this.costosfijos)
  }

}

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ReportesService } from '@core/services'
import { ProgressBarModule } from 'primeng/progressbar';
import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from "@shared/components/toolbar/toolbar.component";

@Component({
  selector: 'depreciacion',
  standalone: true,
  templateUrl: './depreciacion.component.html',
  styles: ``,
  imports: [
    TableModule,
    CommonModule,
    ToolbarComponent,
    ProgressBarModule
  ],
})
export class DepreciacionComponent implements OnInit {
  private readonly reportesServ = inject(ReportesService);

  data: any[] = []

  ngOnInit(): void { this.solicitarInformacion() }

  async solicitarInformacion() {
    await this.reportesServ.obtenerReporteDepreciacion()
      .then((respuesta: any) => this.data = respuesta)
      .catch(() => this.data = [])
  }


}

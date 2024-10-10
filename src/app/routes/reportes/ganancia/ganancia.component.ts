import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ReportesService } from '@core/services'
import { CalendarModule } from 'primeng/calendar';
import { ProgressBarModule } from 'primeng/progressbar';
import { Component, inject, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ToolbarComponent } from "@shared/components/toolbar/toolbar.component";
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'ganancia',
  templateUrl: './ganancia.component.html',
  standalone: true,
  styles: ``,
  imports: [
    FormsModule,
    TableModule,
    CommonModule,
    CalendarModule,
    ToolbarComponent,
    FontAwesomeModule,
    ProgressBarModule,
    ReactiveFormsModule
  ],
})
export class GananciaComponent implements OnInit {
  private readonly reportesServ = inject(ReportesService);

  data: any[] = []
  form = this.fb.group({
    fecha_creacion: [
      [new Date(), new Date()],
      [Validators.required, Validators.minLength(2)]
    ],
  });

  constructor(
    library: FaIconLibrary,
    private fb: FormBuilder
  ) {
    library.addIcons(faSearch);
  }

  ngOnInit(): void { this.solicitarInformacion() }

  async solicitarInformacion(params: any = this.form.getRawValue()) {
    await this.reportesServ.obtenerReporteGananciaPorUsuario(params)
      .then((respuesta: any) => this.data = respuesta)
      .catch(() => this.data = [])
  }
}

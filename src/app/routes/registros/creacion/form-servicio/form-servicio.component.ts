import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { MatButtonModule } from '@angular/material/button';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CatalogosService } from '@services/catologos/catalogos.service';

@Component({
  selector: 'form-servicio',
  standalone: true,
  templateUrl: './form-servicio.component.html',
  styleUrls: ['./form-servicio.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    MatButtonModule,
    KeyFilterModule,
    MtxButtonModule,
    MatFormFieldModule,
  ],
})
export class FormServicioComponent implements OnInit {
  @Input({ required: true, alias: 'precio_kw' }) precioLuz: number = 1;
  @Input({ required: true, alias: 'tipo-operacion' }) operacion: 'creacion' | 'actualizacion' | 'vista' = 'creacion';
  @Input({ alias: 'informacionForm' }) infoForm: any = null;
  @Output() formulario: EventEmitter<any> = new EventEmitter();

  monedas: any[] = [{ label: 'Quetzales', value: 'GTQ' }];
  codigoTiempoUso: any[] = [{ label: 'Horas', value: 'H' }];
  herramientas: any[] = [];
  costoHoraServicio: any[] = []

  totalLuz: number = 0
  totalDepreciacion: number = 0
  totalHorasServicio: number = 0

  form = this.fb.group({
    cod_detalle_servicio: null,
    cod_herramienta: [null, [Validators.required]],
    cod_maestro: null,
    codigo_moneda: ['GTQ', [Validators.required]],
    codigo_tiempo_uso: ['H', [Validators.required]],
    descripcion: [null, [Validators.required]],
    monto_total: [0, [Validators.required]],
    tiempo_uso: [0, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private catalogoService: CatalogosService
  ) { this.solicitarCatalogos(); }

  ngOnInit(): void { this.actualizarForm(); }

  actualizarForm() {
    if (this.infoForm) {
      this.form.patchValue(this.infoForm, { onlySelf: true, emitEvent: true });
      this.form.get('cod_herramienta')?.valueChanges.subscribe(() => this.calculos());
      this.form.get('tiempo_uso')?.valueChanges.subscribe(() => this.calculos());
    }

    if (this.operacion === 'creacion' || this.operacion === 'actualizacion') {
      this.form.enable();
    } else if (this.operacion === 'vista') {
      this.form.disable();
    }

    this.form.controls['codigo_tiempo_uso'].disable()

  }

  calculos() {
    const herramienta = this.herramientas.find((h) => h.cod_herramienta === this.form.get('cod_herramienta')?.value);
    if (herramienta) {
      const tiempoDeUso = Number(this.form.get('tiempo_uso')?.value || '0');
      const potenciaElectrica = Number(herramienta.consumo_electrico);
      const consumoTotal = (potenciaElectrica * tiempoDeUso) / 1000; // Consumo en kWh
      this.totalLuz = consumoTotal * this.precioLuz;

      const total_depreciacion = Number(herramienta.monto) / Number(herramienta.porcentaje_depreciacion_anual);
      const depreciacionPorHora = total_depreciacion / 8784; // 8784 horas en un año
      this.totalDepreciacion = depreciacionPorHora * tiempoDeUso;

      // this.totalPrecioServicio = 
      const { costo_hora } = this.costoHoraServicio.find((c) => c.codigo_moneda = this.form.get('codigo_moneda')?.value)
      this.totalHorasServicio = (costo_hora * tiempoDeUso) / 10

      const montoTotal = (this.totalLuz + this.totalDepreciacion + this.totalHorasServicio).toFixed(2);
      this.form.get('monto_total')?.setValue(Number(montoTotal));
    }
  }

  async solicitarCatalogos() {
    try {
      this.herramientas = await this.catalogoService.obtenerHerramientas();
      this.costoHoraServicio = await this.catalogoService.obtenerCostoFijoHora();
      this.calculos();
    } catch {
      this.herramientas = [];
      this.costoHoraServicio = [];
    }
  }

  emitir() { this.formulario.emit(this.form.getRawValue()); }
}

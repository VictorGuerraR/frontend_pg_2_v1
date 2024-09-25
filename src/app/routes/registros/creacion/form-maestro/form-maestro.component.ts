import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { MatButtonModule } from '@angular/material/button';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'form-maestro',
  standalone: true,
  templateUrl: './form-maestro.component.html',
  styleUrl: './form-maestro.component.scss',
  imports: [
    FormsModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    MatButtonModule,
    KeyFilterModule,
    MtxButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class FormMaestroComponent implements OnInit, OnChanges {

  @Input({ required: true, alias: 'tipo-operacion' }) operacion: 'creacion' | 'actualizacion' | 'vista' = 'creacion';
  @Input({ alias: 'informacionForm' }) infoForm: any = null
  @Output() formulario: EventEmitter<any> = new EventEmitter();

  monedas: any[] = [{ label: 'Quetzales', value: 'GTQ' }]

  form = this.fb.group({
    cod_maestro: null,
    codigo_moneda: ['GTQ', [Validators.required]],
    descripcion: [, [Validators.required]],
    monto_ganacia: [0, [Validators.required]],
    monto_impuesto: [0, [Validators.required]],
    monto_total: [0, [Validators.required]],
    porcentaje_ganancia: [10, [Validators.required]],
    porcentaje_impuesto: [5, [Validators.required]],
    precio_kw: [, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void { this.actualizarForm() }

  ngOnChanges(changes: SimpleChanges): void { this.actualizarForm() }

  actualizarForm() {
    if (this.infoForm) { this.form.patchValue(this.infoForm) }

    if (this.operacion === 'creacion' || this.operacion === 'actualizacion') {
      this.form.enable();
    } else if (this.operacion === 'vista') {
      this.form.disable();
    }
    this.form.controls['codigo_moneda'].disable()
    this.form.controls['monto_impuesto'].disable()
    this.form.controls['monto_ganacia'].disable()
    this.form.controls['monto_total'].disable()
  }

  emitir() { this.formulario.emit(this.form.getRawValue()) }

}

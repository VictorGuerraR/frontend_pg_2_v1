import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MatButtonModule } from '@angular/material/button';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'form-herramientas',
  standalone: true,
  templateUrl: './form-herramientas.component.html',
  styles: ``,
  imports: [
    FormsModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    MatButtonModule,
    KeyFilterModule,
    MtxButtonModule,
    FloatLabelModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class FormHerramientasComponent implements OnInit {

  @Input({ required: true, alias: 'tipo-operacion' }) operacion: 'creacion' | 'edicion' | 'vista' = 'creacion';
  @Input({ alias: 'informacionForm' }) infoForm: any = {}
  @Output() formulario: EventEmitter<any> = new EventEmitter();

  monedas: any[] = [{ label: 'Quetzales', value: 'GTQ' }]
  usuarios: any[] = [];
  tipoDepreciacion: any[] = [];

  form = this.fb.group({
    cod_herramienta: null,
    cod_tipo_depreciacion: [, [Validators.required]],
    cod_usuario_responsable: [, [Validators.required]],
    fecha_adquisicion: [, [Validators.required]],
    descripcion: [, [Validators.required]],
    codigo_moneda: ['GTQ', [Validators.required]],
    monto: [, [Validators.required]],
    consumo_electrico: [, [Validators.required]],
    codigo_medida_electricidad: ['kW', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form.patchValue(this.infoForm)
    // Lógica para habilitar/deshabilitar según la operación
    if (this.operacion === 'creacion' || this.operacion === 'edicion') {
      this.form.enable(); // Habilitar todos los campos
    } else if (this.operacion === 'vista') {
      this.form.disable(); // Deshabilitar todos los campos
    }
  }

  emitir() { this.formulario.emit(this.form.getRawValue()) }

}

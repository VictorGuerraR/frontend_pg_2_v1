import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { MatButtonModule } from '@angular/material/button';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'form-materias-primas',
  standalone: true,
  templateUrl: './form-materias-primas.component.html',
  styles: [``],
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
  ]
})
export class FormMateriasPrimasComponent {

  @Input({ required: true, alias: 'tipo-operacion' }) operacion: 'creacion' | 'actualizacion' | 'vista' = 'creacion';
  @Input({ alias: 'informacionForm' }) infoForm: any = null
  @Output() formulario: EventEmitter<any> = new EventEmitter();

  monedas: any[] = [{ label: 'Quetzales', value: 'GTQ' }]

  form = this.fb.group({
    cod_materia_prima: null,
    descripcion: [, [Validators.required]],
    codigo_moneda: ['GTQ', [Validators.required]],
    monto: [, [Validators.required]],
    cantidad: [, [Validators.required]],
    codigo_unidad: ['KG', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.infoForm) {
      this.form.patchValue(this.infoForm)
    }
    // Lógica para habilitar/deshabilitar según la operación
    if (this.operacion === 'creacion' || this.operacion === 'actualizacion') {
      this.form.enable(); // Habilitar todos los campos
    } else if (this.operacion === 'vista') {
      this.form.disable(); // Deshabilitar todos los campos
    }
    this.form.controls['codigo_unidad'].disable()

  }

  emitir() { this.formulario.emit(this.form.getRawValue()) }
}

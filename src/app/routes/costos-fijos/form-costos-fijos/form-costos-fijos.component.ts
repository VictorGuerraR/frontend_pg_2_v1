import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MatButtonModule } from '@angular/material/button';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'form-costos-fijos',
  standalone: true,
  templateUrl: './form-costos-fijos.component.html',
  styles: ``,
  imports: [
    FormsModule,
    DropdownModule,
    InputTextModule,
    MatButtonModule,
    KeyFilterModule,
    MtxButtonModule,
    FloatLabelModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class FormCostosFijosComponent implements OnInit {

  @Input({ required: true, alias: 'tipo-operacion' }) operacion: 'creacion' | 'edicion' | 'vista' = 'creacion';
  @Input({ alias: 'informacionForm' }) infoForm: any = {}
  @Output() formulario: EventEmitter<any> = new EventEmitter();

  monedas: any[] = [{ label: 'Quetzales', value: 'GTQ' }]

  form = this.fb.group({
    cod_costo_fijo: null,
    descripcion: [, [Validators.required]],
    codigo_moneda: ['GTQ', [Validators.required]],
    monto_total: [, [Validators.required]]
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

import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
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
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class FormCostosFijosComponent implements OnInit {

  @Input({ required: true, alias: 'tipo-operacion' }) operacion: 'creacion' | 'actualizacion' | 'vista' = 'creacion';
  @Input({ alias: 'informacionForm' }) infoForm: any = null
  @Output() formulario: EventEmitter<any> = new EventEmitter();

  monedas: any[] = [{ label: 'Quetzales', value: 'GTQ' }]

  form = this.fb.group({
    cod_costo_fijo: 0,
    descripcion: ["", [Validators.required]],
    codigo_moneda: ['GTQ', [Validators.required]],
    monto_total: [0, [Validators.required]]
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
  }

  emitir() { this.formulario.emit(this.form.getRawValue()) }

}

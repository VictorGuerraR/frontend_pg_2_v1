import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { MatButtonModule } from '@angular/material/button';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CatalogosService } from '@services/catologos/catalogos.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'form-bien',
  standalone: true,
  styleUrl: './form-bien.component.scss',
  templateUrl: './form-bien.component.html',
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
export class FormBienComponent {

  @Input({ required: true, alias: 'tipo-operacion' }) operacion: 'creacion' | 'vista' = 'creacion';
  @Input({ alias: 'informacionForm' }) infoForm: any = null
  @Output() formulario: EventEmitter<any> = new EventEmitter();

  monedas: any[] = [{ label: 'Quetzales', value: 'GTQ' }]
  materiasPrimas: any[] = []

  form = this.fb.group({
    cod_detalle_bien: null,
    cod_maestro: null,
    cod_materia_prima: [, [Validators.required]],
    codigo_moneda: ['GTQ', [Validators.required]],
    codigo_unidad: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    monto_total: [0, [Validators.required]],
    unidad: [0, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private catalogoService: CatalogosService
  ) { this.solicitarCatalogos() }

  ngOnInit(): void {
    console.log(this.infoForm)
    if (this.infoForm) { this.form.patchValue(this.infoForm) }

    if (this.operacion === 'creacion') {
      this.form.enable();
    } else if (this.operacion === 'vista') {
      this.form.disable();
    }
    this.form.controls['codigo_moneda'].disable()
    this.form.controls['codigo_unidad'].disable()

    this.validacionesAdicionales()
  }

  validacionesAdicionales() {
    this.form.get('cod_materia_prima')?.valueChanges
      .subscribe((value) => {
        const materiaPrima = this.materiasPrimas.find((m) => m.cod_materia_prima == value);
        if (materiaPrima) {
          this.form.get('codigo_unidad')?.setValue(materiaPrima.codigo_unidad);
          this.form.get('unidad')?.addValidators([Validators.max(materiaPrima.cantidad)]);
          this.form.get('unidad')?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        }
      });

    this.form.get('unidad')?.valueChanges
      .subscribe((value) => {
        const materiaPrima = this.materiasPrimas
          .find((m) => m.cod_materia_prima == this.form.get('cod_materia_prima')?.value);

        if (materiaPrima) {
          const precioUnitario = Number(materiaPrima.monto) / Number(materiaPrima.cantidad);
          const total = (precioUnitario * Number(value || 0)) || 0;

          // Usa una verificación para asegurar que el valor es un número
          this.form.get('monto_total')?.setValue(total || 0);
        }
      });
  }


  solicitarCatalogos() {
    this.catalogoService.obtenerMateriasPrimas()
      .then((respuesta: any) => this.materiasPrimas = respuesta)
      .catch(() => this.materiasPrimas = [])
  }

  emitir() { this.formulario.emit(this.form.getRawValue()) }
}

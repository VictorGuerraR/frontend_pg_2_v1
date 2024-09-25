import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { MatButtonModule } from '@angular/material/button';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CatalogosService } from '@services/catologos/catalogos.service'
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
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class FormHerramientasComponent implements OnInit {

  @Input({ required: true, alias: 'tipo-operacion' }) operacion: 'creacion' | 'actualizacion' | 'vista' = 'creacion';
  @Input({ alias: 'informacionForm' }) infoForm: any = null
  @Output() formulario: EventEmitter<any> = new EventEmitter();

  monedas: any[] = [{ label: 'Quetzales', value: 'GTQ' }]
  usuarios: any[] = [];
  tipoDepreciacion: any[] = [];

  form = this.fb.group({
    cod_herramienta: null,
    cod_tipo_depreciacion: [, [Validators.required]],
    cod_usuario_responsable: [, [Validators.required]],
    fecha_adquisicion: [new Date(), [Validators.required]],
    descripcion: [, [Validators.required]],
    codigo_moneda: ['GTQ', [Validators.required]],
    monto: [, [Validators.required]],
    consumo_electrico: [, [Validators.required]],
    codigo_medida_electricidad: ['W', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private catalogoService: CatalogosService
  ) { this.solicitarCatalogos() }

  ngOnInit(): void {
    if (this.infoForm) {
      const { fecha_adquisicion, ...info } = this.infoForm
      this.form.patchValue({
        fecha_adquisicion: new Date(fecha_adquisicion),
        ...info
      })
    }
    // Lógica para habilitar/deshabilitar según la operación
    if (this.operacion === 'creacion' || this.operacion === 'actualizacion') {
      this.form.enable(); // Habilitar todos los campos
    } else if (this.operacion === 'vista') {
      this.form.disable(); // Deshabilitar todos los campos
    }

    this.form.controls['codigo_medida_electricidad'].disable()
  }

  solicitarCatalogos() {
    this.catalogoService.obtenerUsuarios()
      .then((respuesta: any) => this.usuarios = respuesta)
      .catch(() => this.usuarios = [])

    this.catalogoService.obtenerTipoDepreciacion()
      .then((respuesta: any) => this.tipoDepreciacion = respuesta)
      .catch(() => this.tipoDepreciacion = [])
  }

  emitir() { this.formulario.emit(this.form.getRawValue()) }

}

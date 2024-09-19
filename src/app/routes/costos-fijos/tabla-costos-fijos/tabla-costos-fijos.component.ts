import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'tabla-costos-fijos',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    FontAwesomeModule
  ],
  templateUrl: './tabla-costos-fijos.component.html',
  styles: ``
})
export class TablaCostosFijosComponent {

  @Input({ required: true, alias: 'costos-fijos' }) data: any = []
  @Output() vista: EventEmitter<any> = new EventEmitter();
  @Output() editar: EventEmitter<any> = new EventEmitter();
  @Output() eliminar: EventEmitter<any> = new EventEmitter();

  constructor(library: FaIconLibrary) { library.addIcons(faEdit, faTrashAlt, faEye); }

}

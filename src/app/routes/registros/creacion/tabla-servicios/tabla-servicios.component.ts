import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'tabla-servicios',
  standalone: true,
  templateUrl: './tabla-servicios.component.html',
  styles: [`
    .custom-button {
      height: 30px;
      width: 46px;
      justify-content: center;
    }
  `],
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    FontAwesomeModule,
    ConfirmDialogModule,
  ],
  providers: [
    ConfirmationService
  ]
})
export class TablaServiciosComponent {
  @Input({ required: true }) soloLectura: boolean = false
  @Input({ required: true, alias: 'data-tabla' }) data: any = []
  @Output() vista: EventEmitter<any> = new EventEmitter();
  @Output() eliminar: EventEmitter<any> = new EventEmitter();

  constructor(
    library: FaIconLibrary,
    private confirmationService: ConfirmationService,
  ) {
    library.addIcons(faTrashAlt, faEye);
  }

  eliminarConfirmacion(event: Event, data: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esta seguro de eliminar este record?',
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => { this.eliminar.emit(data) },
      reject: () => { }
    });
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  styles: [''],
  imports: [
    ToolbarModule,
    ButtonModule,
    FontAwesomeModule
  ],
})
export class ToolbarComponent {
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  @Input() mostrarReturn: boolean = true;
  @Input() mostrarAgregar: boolean = true;
  @Input({ required: true }) titulo: any = []
  @Output() agregar: EventEmitter<any> = new EventEmitter();

  constructor(
    library: FaIconLibrary,
    private location: Location,
  ) {
    library.addIcons(faArrowLeft, faPlus);
  }

  returnUrl() { this.location.back(); }
}

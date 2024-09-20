import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    FontAwesomeModule
  ],
  templateUrl: './toolbar.component.html',
  styles: ''
})
export class ToolbarComponent {
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
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

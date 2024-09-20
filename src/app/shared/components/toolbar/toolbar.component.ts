import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
  
  constructor(
    library: FaIconLibrary,
    private location: Location,
  ) {
    library.addIcons(faArrowLeft);
  }

  returnUrl() { this.location.back(); }
}

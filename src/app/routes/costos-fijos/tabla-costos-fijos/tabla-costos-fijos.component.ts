import { TableModule } from 'primeng/table';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tabla-costos-fijos',
  standalone: true,
  imports: [
    TableModule,
    CommonModule
  ],
  templateUrl: './tabla-costos-fijos.component.html',
  styles: ``
})
export class TablaCostosFijosComponent {

  @Input({ required: true, alias: 'costos-fijos' }) data: any = []


}

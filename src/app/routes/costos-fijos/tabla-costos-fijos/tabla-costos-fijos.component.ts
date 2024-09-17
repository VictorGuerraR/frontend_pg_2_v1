import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tabla-costos-fijos',
  standalone: true,
  imports: [],
  templateUrl: './tabla-costos-fijos.component.html',
  styles: ``
})
export class TablaCostosFijosComponent implements OnInit {

  ngOnInit(): void {
    console.log(this.data)
  }

  @Input({ required: true, alias: 'costos-fijos' }) data: any = []

}

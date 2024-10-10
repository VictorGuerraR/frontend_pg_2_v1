import { Subscription } from 'rxjs';
import { SettingsService } from '@core';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '@shared';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { DashboardService, Stat } from './dashboard.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MtxProgressModule } from '@ng-matero/extensions/progress';
import { ToolbarComponent } from "@shared/components/toolbar/toolbar.component";
import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService],
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatTableModule,
    MatChipsModule,
    CommonModule,
    CalendarModule,
    ToolbarComponent,
    FontAwesomeModule,
    MatButtonModule,
    MtxProgressModule,
    MatGridListModule,
    BreadcrumbComponent,
    ReactiveFormsModule
  ],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  charts = this.dashboardSrv.getCharts();
  chart1?: ApexCharts;
  chart2?: ApexCharts;
  stats: Stat[] = [];
  notifySubscription = Subscription.EMPTY;

  form = this.fb.group({
    fecha_creacion: [
      [new Date(), new Date()],
      [Validators.required, Validators.minLength(2)]
    ],
  });

  constructor(
    library: FaIconLibrary,
    private fb: FormBuilder,
    private readonly ngZone: NgZone,
    private readonly settings: SettingsService,
    private readonly dashboardSrv: DashboardService,
  ) { library.addIcons(faSearch); }

  ngOnInit() {
    this.solicitarInformacion()
    // this.notifySubscription = this.settings.notify.subscribe(opts => this.updateCharts(opts))
  }

  ngAfterViewInit() { /* this.ngZone.runOutsideAngular(() => this.initCharts()); */ }

  ngOnDestroy() {
    this.chart1?.destroy();
    this.chart2?.destroy();
    this.notifySubscription.unsubscribe();
  }

  // initCharts() {
  //   this.chart1 = new ApexCharts(document.querySelector('#chart1'), this.charts[0]);
  //   this.chart1?.render();
  //   this.chart2 = new ApexCharts(document.querySelector('#chart2'), this.charts[1]);
  //   this.chart2?.render();

  //   this.updateCharts(this.settings.options);
  // }

  // updateCharts(opts: Partial<any>) {
  //   this.chart1?.updateOptions({
  //     chart: {
  //       foreColor: opts.theme === 'dark' ? '#ccc' : '#333',
  //     },
  //     tooltip: {
  //       theme: opts.theme === 'dark' ? 'dark' : 'light',
  //     },
  //     grid: {
  //       borderColor: opts.theme === 'dark' ? '#5a5a5a' : '#e9e9e9',
  //     },
  //   });

  //   this.chart2?.updateOptions({
  //     chart: {
  //       foreColor: opts.theme === 'dark' ? '#ccc' : '#333',
  //     },
  //     plotOptions: {
  //       radar: {
  //         polygons: {
  //           strokeColors: opts.theme === 'dark' ? '#5a5a5a' : '#e9e9e9',
  //           connectorColors: opts.theme === 'dark' ? '#5a5a5a' : '#e9e9e9',
  //           fill: {
  //             colors: opts.theme === 'dark' ? ['#2c2c2c', '#222'] : ['#f8f8f8', '#fff'],
  //           },
  //         },
  //       },
  //     },
  //     tooltip: {
  //       theme: opts.theme === 'dark' ? 'dark' : 'light',
  //     },
  //   });
  // }

  async solicitarInformacion(params: any = this.form.getRawValue()) {
    await this.dashboardSrv.obtenerGraficaStats(params)
      .then((respuesta: any) => this.stats = respuesta)
      .catch(() => this.stats = [])
  }
}

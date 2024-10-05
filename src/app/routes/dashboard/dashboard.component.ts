import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared';
import { DashboardService, Stat } from './dashboard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MtxProgressModule } from '@ng-matero/extensions/progress';
import { RouterLink } from '@angular/router';
import { SettingsService } from '@core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService],
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatTabsModule,
    MtxProgressModule,
    BreadcrumbComponent,
  ],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  charts = this.dashboardSrv.getCharts();
  chart1?: ApexCharts;
  chart2?: ApexCharts;
  stats: Stat[] = [];
  notifySubscription = Subscription.EMPTY;

  constructor(
    private readonly ngZone: NgZone,
    private readonly settings: SettingsService,
    private readonly dashboardSrv: DashboardService,
  ) { }

  ngOnInit() {
    this.dashboardSrv.obtenerGraficaStats().then((res: any) => this.stats = res)
    // this.notifySubscription = this.settings.notify.subscribe(opts => this.updateCharts(opts))
  }

  ngAfterViewInit() { /* this.ngZone.runOutsideAngular(() => this.initCharts()); */ }

  ngOnDestroy() {
    this.chart1?.destroy();
    this.chart2?.destroy();
    this.notifySubscription.unsubscribe();
  }

  initCharts() {
    this.chart1 = new ApexCharts(document.querySelector('#chart1'), this.charts[0]);
    this.chart1?.render();
    this.chart2 = new ApexCharts(document.querySelector('#chart2'), this.charts[1]);
    this.chart2?.render();

    this.updateCharts(this.settings.options);
  }

  updateCharts(opts: Partial<any>) {
    this.chart1?.updateOptions({
      chart: {
        foreColor: opts.theme === 'dark' ? '#ccc' : '#333',
      },
      tooltip: {
        theme: opts.theme === 'dark' ? 'dark' : 'light',
      },
      grid: {
        borderColor: opts.theme === 'dark' ? '#5a5a5a' : '#e9e9e9',
      },
    });

    this.chart2?.updateOptions({
      chart: {
        foreColor: opts.theme === 'dark' ? '#ccc' : '#333',
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: opts.theme === 'dark' ? '#5a5a5a' : '#e9e9e9',
            connectorColors: opts.theme === 'dark' ? '#5a5a5a' : '#e9e9e9',
            fill: {
              colors: opts.theme === 'dark' ? ['#2c2c2c', '#222'] : ['#f8f8f8', '#fff'],
            },
          },
        },
      },
      tooltip: {
        theme: opts.theme === 'dark' ? 'dark' : 'light',
      },
    });
  }
}

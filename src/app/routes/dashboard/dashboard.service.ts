import { ApexOptions } from 'apexcharts';
import { Injectable } from '@angular/core';
import { PeticionesHttpsService } from '@servicesTools/tools'

export interface Stat {
  title: string;
  amount: string;
  progress: {
    value: number;
  };
  color: string;
}

@Injectable()
export class DashboardService {

  charts: ApexOptions[] = [
    {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      series: [
        {
          name: 'UV',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'Download',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      xaxis: {
        type: 'datetime',
        categories: [
          '2019-11-24T00:00:00',
          '2019-11-24T01:30:00',
          '2019-11-24T02:30:00',
          '2019-11-24T03:30:00',
          '2019-11-24T04:30:00',
          '2019-11-24T05:30:00',
          '2019-11-24T06:30:00',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
      },
    },
    {
      chart: {
        height: 350,
        type: 'radar',
      },
      series: [
        {
          name: 'Weekly Revenue',
          data: [30, 110, 50, 40, 60, 90, 45],
        },
      ],
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            strokeColors: '#e9e9e9',
            fill: {
              colors: ['#f8f8f8', '#fff'],
            },
          },
        },
      },
      colors: ['#FF4560'],
      markers: {
        size: 4,
        strokeWidth: 2,
      },
      tooltip: {
        y: {
          formatter: (val: number) => val.toString(),
        },
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: (val: number, i: number) => {
            if (i % 2 === 0) {
              return val.toString();
            } else {
              return '';
            }
          },
        },
      },
    },
  ];

  constructor(
    private peticionesHttpsServ: PeticionesHttpsService
  ) { }

  obtenerGraficaStats(params: any) { return this.peticionesHttpsServ.httpsGet('/graficas-1', params) }

  getCharts() { return this.charts; }

}

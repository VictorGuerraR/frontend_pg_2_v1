import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideMomentDatetimeAdapter } from '@ng-matero/extensions-moment-adapter';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { ToastrModule } from 'ngx-toastr';

import { BASE_URL, appInitializerProviders, httpInterceptorProviders } from '@core';
import { environment } from '@env/environment';
import { PaginatorI18nService } from '@shared';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
      withComponentInputBinding()
    ),
    importProvidersFrom(
      NgProgressHttpModule,
      NgProgressRouterModule,
      NgxPermissionsModule.forRoot(),
      ToastrModule.forRoot(),
    ),
    { provide: BASE_URL, useValue: environment.baseUrl },
    httpInterceptorProviders,
    appInitializerProviders,
    {
      provide: MatPaginatorIntl,
      useFactory: (paginatorI18nSrv: PaginatorI18nService) => paginatorI18nSrv.getPaginatorIntl(),
      deps: [PaginatorI18nService],
    },
    {
      provide: MAT_DATE_LOCALE,
      useFactory: () => navigator.language, // <= This will be overrided by runtime setting
    },
    provideMomentDateAdapter({
      parse: {
        dateInput: 'YYYY-MM-DD',
      },
      display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'YYYY MMM',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY MMM',
      },
    }),
    provideMomentDatetimeAdapter({
      parse: {
        dateInput: 'YYYY-MM-DD',
        yearInput: 'YYYY',
        monthInput: 'MMMM',
        datetimeInput: 'YYYY-MM-DD HH:mm',
        timeInput: 'HH:mm',
      },
      display: {
        dateInput: 'YYYY-MM-DD',
        yearInput: 'YYYY',
        monthInput: 'MMMM',
        datetimeInput: 'YYYY-MM-DD HH:mm',
        timeInput: 'HH:mm',
        monthYearLabel: 'YYYY MMMM',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
        popupHeaderDateLabel: 'MMM DD, ddd',
      },
    }),
  ],
};

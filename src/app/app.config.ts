import { routes } from './app.routes';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '@env/environment';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BASE_URL, httpInterceptorProviders } from '@core';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';



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
    {
      provide: MAT_DATE_LOCALE,
      useFactory: () => navigator.language, // <= This will be overrided by runtime setting
    }
  ],
};

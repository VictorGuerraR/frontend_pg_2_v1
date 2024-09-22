import { filter } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { PreloaderService, SettingsService } from '@core';
import { Component, OnInit, AfterViewInit, inject, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {

  private readonly preloader = inject(PreloaderService);
  private readonly settings = inject(SettingsService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.settings.setTheme();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.preloader.hide();
      });
  }
}


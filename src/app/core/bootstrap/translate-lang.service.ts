import { Injectable, inject } from '@angular/core';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class TranslateLangService {
  private readonly settings = inject(SettingsService);

  load() {
    return new Promise<void>(resolve => {
      const browserLang = navigator.language;
      const defaultLang = browserLang.match(/en-US|es-GT/) ? browserLang : 'es-GT';

      this.settings.setLanguage(defaultLang);
    });
  }
}

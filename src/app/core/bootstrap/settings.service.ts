import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { AppSettings, AppTheme, defaults } from '../settings';
import { EncriptService } from '@services/tools/encript.service';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly key = 'app-settings';
  private readonly document = inject(DOCUMENT);
  private readonly mediaMatcher = inject(MediaMatcher);
  private readonly encriptServ = inject(EncriptService);

  private readonly notify$ = new BehaviorSubject<Partial<AppSettings>>({});

  get notify() { return this.notify$.asObservable(); }

  private htmlElement!: HTMLHtmlElement;

  options: AppSettings;

  themeColor: Exclude<AppTheme, 'auto'> = 'light';

  constructor() {
    const storedOptions = this.encriptServ.getSavedAndDecryptedData({ key: this.key, strategy: 'local' });
    this.options = Object.assign(defaults, storedOptions);
    this.themeColor = this.getThemeColor();
    this.htmlElement = this.document.querySelector('html')!;
  }

  reset() { this.encriptServ.deleteSavedData({ key: this.key, strategy: 'local' }); }

  getThemeColor() {
    // Check whether the browser support `prefers-color-scheme`
    if (
      this.options.theme === 'auto' &&
      this.mediaMatcher.matchMedia('(prefers-color-scheme)').media !== 'not all'
    ) {
      const isSystemDark = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
      // Set theme to dark if `prefers-color-scheme` is dark. Otherwise, set it to light.
      return isSystemDark ? 'dark' : 'light';
    } else {
      return this.options.theme as Exclude<AppTheme, 'auto'>;
    }
  }

  setOptions(options: AppSettings) {
    this.options = Object.assign(defaults, options);
    this.encriptServ.saveAndEncriptData({ key: this.key, strategy: 'local', data: this.options })
    this.notify$.next(this.options);
  }

  setLanguage(lang: string) {
    this.options.language = lang;
    this.encriptServ.saveAndEncriptData({ key: this.key, strategy: 'local', data: this.options })
    this.notify$.next(this.options);
  }

  setTheme() {
    this.themeColor = this.getThemeColor();

    if (this.themeColor === 'dark') {
      this.htmlElement.classList.add('theme-dark');
    } else {
      this.htmlElement.classList.remove('theme-dark');
    }
  } 
}

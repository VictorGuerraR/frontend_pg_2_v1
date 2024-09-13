import { Injectable, inject } from '@angular/core';
import { Menu, MenuService } from './menu.service';

@Injectable({ providedIn: 'root' })
export class StartupService {
  private readonly menuService = inject(MenuService);


  load() { }

  private setMenu(menu: Menu[]) {
    this.menuService.addNamespace(menu, 'menu');
    this.menuService.set(menu);
  }
}

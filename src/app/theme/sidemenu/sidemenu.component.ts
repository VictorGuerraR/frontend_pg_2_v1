import { MenuService, Menu } from '@core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NavAccordionDirective } from './nav-accordion.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AsyncPipe, NgTemplateOutlet, SlicePipe } from '@angular/common';
import { NavAccordionItemDirective } from './nav-accordion-item.directive';
import { NavAccordionToggleDirective } from './nav-accordion-toggle.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Input, inject, Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { faDashboard, faWrench, faCogs, faDollarSign, faReceipt, faUserCircle } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    SlicePipe,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    NgxPermissionsModule,
    MatIconModule,
    MatRippleModule,
    NavAccordionDirective,
    NavAccordionItemDirective,
    FontAwesomeModule,
    NavAccordionToggleDirective,
  ],
  animations: [
    trigger('expansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: '' })),
      transition(
        'expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4,0,0.2,1)')
      ),
    ]),
  ],
})
export class SidemenuComponent implements OnInit {
  @Input() ripple = false;
  private readonly menuService = inject(MenuService);

  menu: Menu[] = [
    {
      route: 'dashboard',
      name: 'Inicio',
      type: 'link',
      icon: ['fas', 'dashboard'] // Cambia 'icon' por el formato que necesita FontAwesome
    },
    {
      route: 'herramientas',
      name: 'Herramientas',
      type: 'link',
      icon: ['fas', 'wrench']
    },
    {
      route: 'materias-primas',
      name: 'Materias Primas',
      type: 'link',
      icon: ['fas', 'cogs']
    },
    {
      route: 'costos-fijos',
      name: 'Costos Fijos',
      type: 'link',
      icon: ['fas', 'dollar-sign']
    },
    {
      route: 'registros',
      name: 'Registros',
      type: 'link',
      icon: ['fas', 'receipt']
    },
    {
      route: 'usuarios',
      name: 'Usuarios',
      type: 'link',
      icon: ['fas', 'user-circle']
    },
  ];

  constructor(
    private library: FaIconLibrary
  ) {
    this.library.addIcons(
      faDashboard,
      faWrench,
      faCogs,
      faDollarSign,
      faReceipt,
      faUserCircle
    );
  }


  menu$ = this.menuService.getAll();

  ngOnInit(): void { this.menuService.set(this.menu); }

  buildRoute = this.menuService.buildRoute;
}

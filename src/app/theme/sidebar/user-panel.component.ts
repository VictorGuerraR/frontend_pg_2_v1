import { RouterLink } from '@angular/router';
import { LoginService } from '@core/authentication'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';


@Component({
  selector: 'app-user-panel',
  template: `
    <div class="matero-user-panel"> 
      <div class="matero-user-panel-info">
        <h4>{{ user?.nombres }} {{user?.apellidos}}</h4>
        <h5>{{ user?.usuario }}</h5>
      </div>
    </div>
  `,
  styleUrl: './user-panel.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatTooltipModule],
})
export class UserPanelComponent implements OnInit {
  private readonly loginServ = inject(LoginService);

  user: any = this.loginServ.getUser()

  ngOnInit(): void { }
}

import { Component, inject } from '@angular/core';
import { LoginService, TokenService } from '@core/authentication'
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MtxButtonModule,
  ],
})
export class LoginComponent {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly loginServ = inject(LoginService);
  private readonly tokenServ = inject(TokenService);

  isSubmitting = false;

  loginForm = this.fb.nonNullable.group({
    username: [, [Validators.required]],
    password: [, [Validators.required]]
  });

  get username() { return this.loginForm.get('username')!; }
  get password() { return this.loginForm.get('password')!; }

  login() {
    this.isSubmitting = true;
    const { username = "", password = "" } = this.loginForm.getRawValue()
    // Realizar la solicitud de login y manejar la respuesta
    this.loginServ.login(username, password).subscribe({
      next: ({ token, usuario }) => {
        this.tokenServ.saveToken(token)
        this.loginServ.saveUser(usuario)
        this.router.navigate(['sistema']);
      },
      error: (error) => {
        this.tokenServ.deleteToken()
        this.loginServ.deleteUser()
        this.router.navigate(['']);
      }
    });
  }
}

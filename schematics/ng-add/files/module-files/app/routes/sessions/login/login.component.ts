import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);

  isSubmitting = false;

  get username() { return this.loginForm.get('username')! }
  get password() { return this.loginForm.get('password')! }
  get rememberMe() { return this.loginForm.get('rememberMe')! }

  loginForm = this.fb.nonNullable.group({
    username: ['ng-matero', [Validators.required]],
    password: ['ng-matero', [Validators.required]],
    rememberMe: [false],
  });


  login() { this.isSubmitting = true; }
}

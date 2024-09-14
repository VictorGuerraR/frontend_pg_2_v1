import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '@core/authentication';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private tokenService: TokenService,
        private router: Router
    ) { }

    canActivate(): boolean {
        if (this.tokenService.existToken()) {
            return true;
        } else {
            this.router.navigate(['auth/login']);
            return false;
        }
    }
}

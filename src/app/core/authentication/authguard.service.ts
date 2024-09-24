import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '@core/authentication';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private tokenService: TokenService
    ) { }

    canActivate(): boolean {
        if (this.tokenService.getToken()) {
            return true;
        } else {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }
}

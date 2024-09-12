import { map } from 'rxjs';
import { Menu } from '@core';
import { Token, User } from './interface';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

type Usuario = {
  cod_usuario: number;
  fecha_creacion: Date;
  nombres: string;
  apellidos: string;
  usuario?: string;
  password?: string;
  activo?: boolean;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  protected readonly http = inject(HttpClient);

  login(username: string, password: string) {
    return this.http.post<Token>('/loggin-token', { username, password });
  }

  // refresh(params: Record<string, any>) {
  //   return this.http.post<Token>('/auth/refresh', params);
  // }

  // logout() {
  //   return this.http.post<any>('/auth/logout', {});
  // }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}

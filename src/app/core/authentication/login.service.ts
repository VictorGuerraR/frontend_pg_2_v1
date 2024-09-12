import { map, Observable } from 'rxjs';
import { Menu } from '@core';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EncriptService } from '@services/tools/encript.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  protected readonly http = inject(HttpClient);
  private readonly encriptServ = inject(EncriptService);

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('/loggin-token', { username, password });
  }

  saveUser(user?: any) { return this.encriptServ.saveAndEncriptData({ key: 'user', strategy: 'local', data: user }) }

  getUser() { return this.encriptServ.getSavedAndDecryptedData({ key: 'user', strategy: 'local' }) }

  existUser() { return this.encriptServ.verifyIfExistOnStorage({ key: 'user', strategy: 'local' }) }

  deleteUser() { return this.encriptServ.deleteSavedData({ key: 'user', strategy: 'local' }) }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}

import { EncriptService } from '@services/tools/encript.service';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly encriptServ = inject(EncriptService);

  saveToken(token?: any) { return this.encriptServ.saveAndEncriptData({ key: 'token', strategy: 'local', data: token }) }

  getToken() { return this.encriptServ.getSavedAndDecryptedData({ key: 'token', strategy: 'local' }) }

  existToken() { return this.encriptServ.verifyIfExistOnStorage({ key: 'token', strategy: 'local' }) }

  deleteToken() { return this.encriptServ.deleteSavedData({ key: 'token', strategy: 'local' }) }

}

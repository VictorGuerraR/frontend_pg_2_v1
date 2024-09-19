import dayjs from 'dayjs';
import CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

type SaveStrategy = 'local' | 'session';

interface saveAndEncriptDataParams {
  data: any;
  key: string;
  strategy: SaveStrategy;
}

@Injectable({ providedIn: 'root' })
export class EncriptService {

  private secretKey = 'clave-Para-Cifrar-Los-Catalogos'
  TIEMPO_EXPIRACION_MS: number = 9 * 60 * 60 * 1000; // Hrs * Min * Seg * mil =  9 horas en milisegundos

  private storageStrategies = {
    local: {
      save: (key: string, value: string) => localStorage.setItem(key, value),
      delete: (key: string) => localStorage.removeItem(key),
      get: (key: string) => localStorage.getItem(key),
      existOnStorage: (key: string): boolean => localStorage.hasOwnProperty(key),
    },
    session: {
      save: (key: string, value: string) => sessionStorage.setItem(key, value),
      delete: (key: string) => sessionStorage.removeItem(key),
      get: (key: string) => sessionStorage.getItem(key),
      existOnStorage: (key: string): boolean => sessionStorage.hasOwnProperty(key),
    },
  };

  constructor(private router: Router) { }

  public verifyIfExistOnStorage({ key, strategy }: { key: string; strategy: SaveStrategy; }): boolean {
    return this.storageStrategies[strategy].existOnStorage(key)
  }

  public saveAndEncriptData({ data, key, strategy, }: saveAndEncriptDataParams, encrypt: boolean = true): void {
    if (encrypt) {
      const dataToSave = {
        data: this.encrypt(JSON.stringify(data)),
        timestamp: dayjs().valueOf(),
      };
      this.storageStrategies[strategy].save(key, JSON.stringify(dataToSave));

    } else {
      this.storageStrategies[strategy].save(key, data);
    }
  }

  public getSavedAndDecryptedData<T>({ key, strategy }: { key: string; strategy: SaveStrategy; }, encrypt: boolean = true): T | any {
    if (!this.storageStrategies[strategy].existOnStorage(key)) return null;

    if (!encrypt) return this.storageStrategies[strategy].get(key)

    const parsedData = JSON.parse(this.storageStrategies[strategy].get(key) ?? '') as {
      data: any;
      timestamp: string;
    };

    const currentDate = dayjs();
    const expiredDate = dayjs(parsedData.timestamp).add(this.TIEMPO_EXPIRACION_MS, 'milliseconds');

    if (currentDate.isAfter(expiredDate)) {
      this.storageStrategies[strategy].delete(key);
      this.router.navigate(['/auth/login']);
      return null;
    }

    return JSON.parse(this.decrypt(parsedData.data));
  }

  public deleteSavedData({ key, strategy }: { key: string; strategy: SaveStrategy; }) {
    this.storageStrategies[strategy].delete(key);
  }

  private encrypt(data: any): string {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), environment.encriptionKey).toString();
    return encryptedData;
  }

  private decrypt(encryptedData: string): any {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, environment.encriptionKey);
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }

}

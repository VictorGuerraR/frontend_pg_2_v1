import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PeticionesHttpsService {

  constructor(private http: HttpClient) { }

  httpsGet<T>(url: string, params: any = {}): Promise<T> {
    const httpParams = new HttpParams({ fromObject: params });
    return firstValueFrom(this.http.get<T>(url, { params: httpParams }))
  }

  httpsPost<T>(url: string, body: Object = {}): Promise<T> {
    return firstValueFrom(this.http.post<T>(url, body))
  }

  httpsPatch<T>(url: string, body: Object = {}): Promise<T> {
    return firstValueFrom(this.http.patch<T>(url, body))
  }

  httpsDelete<T>(url: string, body: Object = {}): Promise<T> {
    return firstValueFrom(this.http.delete<T>(url, { body }))
  }
}

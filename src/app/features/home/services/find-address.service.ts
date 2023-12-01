import { Address } from '../../../core/interfaces/address.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FindAddressService {
  constructor(private _http: HttpClient) {}

  public findAddress(cep: string): Observable<Address> {
    return this._http.get<Address>(`https://viacep.com.br/ws/${cep}/json`);
  }
}

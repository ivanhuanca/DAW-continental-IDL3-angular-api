import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private _http: HttpClient) { }

  addVenta(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/ventas', data)
  }

  getVentasList(): Observable<any> {
    return this._http.get('http://localhost:3000/ventas')
  }
}

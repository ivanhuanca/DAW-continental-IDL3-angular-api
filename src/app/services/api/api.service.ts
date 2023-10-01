import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token: string = "c8c095b4a02d8dc35c4a716906b8b906a7f8b373eb61a9195ace998a9e052e0e";
  API_dni: string = "https://apiperu.dev/api/dni"
  
  constructor(private _http: HttpClient) { }

  //extraer datos de la API DNI
  getDNI(dni: string): Observable<any> {
    return this._http.get(`${this.API_dni}/${dni}?api_token=${this.token}`)
  }

  //fake api json-server
  addItem(endpoint: string, data: any): Observable<any> {
    return this._http.post(`http://localhost:3000/${endpoint}`, data)
  }

  updateItem(endpoint: string, id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/${endpoint}/${id}`, data)
  }

  getItemsList(endpoint: string): Observable<any> {
    return this._http.get(`http://localhost:3000/${endpoint}`)
  }

  getItem(endpoint: string, id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/${endpoint}/${id}`)
  }

  getItemOption(endpoint: string, op: string): Observable<any> {//, value: string | number
    return this._http.get(`http://localhost:3000/${endpoint}?q=${op}`)
  }

  deleteItem(endpoint: string, id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/${endpoint}/${id}`)
  }
}

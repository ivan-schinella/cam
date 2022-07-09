import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  constructor(private _http: HttpClient) {}

  // connect frontend to backend

  apiUrl: string = 'http://192.168.1.141:8000/camera';

  // get all data
  getAllData(): Observable<any> {
    return this._http.get(`${this.apiUrl}`);
  }

  // create data
  createData(data: any): Observable<any> {
    console.log(data, 'createapi==>');
    return this._http.post(`${this.apiUrl}`, data);
  }

  // delete data
  deleteData(id: number): Observable<any> {
    let ids = id;
    return this._http.delete(`${this.apiUrl}/${ids}`);
  }

  // update data
  updateData(data: any, id: number): Observable<any> {
    let ids = id;
    return this._http.put(`${this.apiUrl}/${ids}`, data);
  }

  // getsingledata
  getSingleData(id: number): Observable<any> {
    let ids = id;
    return this._http.get(`${this.apiUrl}/${ids}`);
  }
}

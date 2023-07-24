import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN, REGIONS } from '../model/url.class';
import { Auth } from 'src/app/auth/_aShared/auth.class';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  token = Auth.User('token');

  private API_URL = `http://127.0.0.1:8000/api/${ADMIN}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  }

  constructor(private http: HttpClient){}

  getRegions(): Observable<any>{
    const url = `${this.API_URL}/${REGIONS}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  findOne(id:any): Observable<any>{
    const url = `${this.API_URL}/${REGIONS}/${id}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  createRegion(data: any): Observable<any>{
    const url = `${this.API_URL}/${REGIONS}`;
    return this.http.post<any>(url, data, this.httpOptions);
  }

  updateRegion(id:any, data:any): Observable<any>{
    const url = `${this.API_URL}/${REGIONS}/${id}`;
    return this.http.post<any>(url, data, this.httpOptions)
  }

  deleteRegion(id:any): Observable<any>{
    const url = `${this.API_URL}/${REGIONS}/${id}`;
    return this.http.delete(url, this.httpOptions)
  }

}

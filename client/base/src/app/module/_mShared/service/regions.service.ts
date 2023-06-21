import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN, REGIONS } from '../model/url.class';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  sessionUser:any = sessionStorage.getItem('user');
  user:any = JSON.parse(this.sessionUser);

  private API_URL = `http://127.0.0.1:8000/api/${ADMIN}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.user.token}`
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
    return this.http.put<any>(url, data, this.httpOptions)
  }

  deleteRegion(id:any): Observable<any>{
    const url = `${this.API_URL}/${REGIONS}/${id}`;
    return this.http.delete(url, this.httpOptions)
  }

}

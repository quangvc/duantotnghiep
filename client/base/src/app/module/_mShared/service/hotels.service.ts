import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN, HOTELS, IMAGE } from '../model/url.class';
import { Auth } from 'src/app/auth/_aShared/auth.class';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  token = Auth.User('token');

  private API_URL = `http://127.0.0.1:8000/api`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  }
  private httpOption2 = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    }),
  }
  constructor(private http: HttpClient){}

  getHotels(): Observable<any>{
    const url = `${this.API_URL}/${ADMIN}/${HOTELS}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  findOne(id:any): Observable<any>{
    const url = `${this.API_URL}/${ADMIN}/${HOTELS}/${id}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  createHotel(data: any): Observable<any>{
    const url = `${this.API_URL}/${ADMIN}/${HOTELS}`;
    return this.http.post(url, data, this.httpOptions);
  }

  updateHotel(id:any, data:any): Observable<any>{
    const url = `${this.API_URL}/${ADMIN}/${HOTELS}/${id}`;
    return this.http.put(url, data, this.httpOptions)
  }

  deleteHotel(id:any): Observable<any>{
    const url = `${this.API_URL}/${ADMIN}/${HOTELS}/${id}`;
    return this.http.delete(url, this.httpOptions)
  }

  changeStatus(id:any, data?:any): Observable<any>{
    const url = `${this.API_URL}/${ADMIN}/${HOTELS}/changeStatus/${id}`;
    return this.http.put(url,data,this.httpOptions)
  }

  getImage(): Observable<any>{
    const url = `${this.API_URL}/${ADMIN}/${IMAGE}`;
    return this.http.get<any>(url, this.httpOptions);
  }

}

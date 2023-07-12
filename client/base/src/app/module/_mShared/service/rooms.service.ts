import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN, ROOMS } from '../model/url.class';
import { Auth } from 'src/app/auth/_aShared/auth.class';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {

  token = Auth.User('token');

  private API_URL = `http://127.0.0.1:8000/api/${ADMIN}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getRooms(): Observable<any> {
    const url = `${this.API_URL}/${ROOMS}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  findOne(id:any): Observable<any>{
    const url = `${this.API_URL}/${ROOMS}/${id}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  createRoom(data: any): Observable<any> {
    const url = `${this.API_URL}/${ROOMS}`;
    return this.http.post<any>(url, data, this.httpOptions);
  }

  updateRoom(id: any, data: any): Observable<any> {
    const url = `${this.API_URL}/${ROOMS}/${id}`;
    return this.http.put<any>(url, data, this.httpOptions);
  }

  deleteRoom(id: any): Observable<any> {
    const url = `${this.API_URL}/${ROOMS}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }
}

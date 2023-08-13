import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN, CLIENT, ROOM_TYPES } from '../model/url.class';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomTypeService {

  token = Auth.User('token');

  private API_URL = `${environment.api}/api/${ADMIN}`;
  private API_URL_CLIENT = `${environment.api}/api/${CLIENT}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getRoomTypes(): Observable<any> {
    const url = `${this.API_URL}/${ROOM_TYPES}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  findOne(id:any): Observable<any>{
    const url = `${this.API_URL}/${ROOM_TYPES}/${id}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  filterRoomType(hotelId: any, checkin: any, checkout:any): Observable<any> {
    const url = `${this.API_URL_CLIENT}/${ROOM_TYPES}/get/${hotelId}/${checkin}/${checkout}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  createRoomType(data: any): Observable<any> {
    const url = `${this.API_URL}/${ROOM_TYPES}`;
    return this.http.post<any>(url, data, this.httpOptions);
  }

  updateRoomType(id: any, data: any): Observable<any> {
    const url = `${this.API_URL}/${ROOM_TYPES}/${id}`;
    return this.http.put<any>(url, data, this.httpOptions);
  }

  deleteRoomType(id: any): Observable<any> {
    const url = `${this.API_URL}/${ROOM_TYPES}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }
}

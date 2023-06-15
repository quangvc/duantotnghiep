import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOM_TYPES } from '../model/url.class';

@Injectable({
  providedIn: 'root',
})
export class RoomTypeService {
  sessionUser: any = sessionStorage.getItem('user');
  user: any = JSON.parse(this.sessionUser);

  private API_URL = 'http://127.0.0.1:8000/api';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.user.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getRoomTypes(): Observable<any> {
    const url = `${this.API_URL}/${ROOM_TYPES}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  createRoomType(data: any): Observable<any> {
    const url = `${this.API_URL}/${ROOM_TYPES}/create`;
    return this.http.post<any>(url, data, this.httpOptions);
  }

  updateRoomType(id: any, data: any): Observable<any> {
    const url = `${this.API_URL}/${ROOM_TYPES}/${id}`;
    return this.http.put<any>(url, data, this.httpOptions);
  }

  deleteRegion(id: any): Observable<any> {
    const url = `${this.API_URL}/${ROOM_TYPES}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }
}

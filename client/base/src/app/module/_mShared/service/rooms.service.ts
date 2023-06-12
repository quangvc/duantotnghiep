import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(private http: HttpClient) {}

  URL = 'http://localhost:3000/rooms';

  getRooms(): Observable<any> {
    return this.http.get(this.URL);
  }

  createRoom(data: any): Observable<any> {
    return this.http.post(this.URL, data);
  }

  updateRoom(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/${id}`, data);
  }
}

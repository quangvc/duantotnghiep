import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLIENT, ROOMS } from 'src/app/module/_mShared/model/url.class';

@Injectable({
  providedIn: 'root'
})
export class RoomClientService {


  private API_URL = `http://127.0.0.1:8000/api/${CLIENT}`;


  constructor(private http: HttpClient) {}

  getRooms(): Observable<any> {
    const url = `${this.API_URL}/${ROOMS}`;
    return this.http.get<any>(url);
  }

  findOne(id:any): Observable<any>{
    const url = `${this.API_URL}/${ROOMS}/${id}`;
    return this.http.get<any>(url);
  }
}

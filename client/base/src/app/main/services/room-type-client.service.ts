import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLIENT, ROOM_TYPES, IMAGE } from 'src/app/module/_mShared/model/url.class'

@Injectable({
  providedIn: 'root'
})
export class roomTypeClientService {

  // sessionUser:any = sessionStorage.getItem('user');
  // user:any = JSON.parse(this.sessionUser);

  private API_URL = `http://127.0.0.1:8000/api/${CLIENT}`;

  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Authorization': `Bearer ${this.user.token}`
  //   })
  // }

  constructor(private http: HttpClient){}

  getRoomTypes(): Observable<any>{
    const url = `${this.API_URL}/${ROOM_TYPES}`;
    return this.http.get<any>(url);
  }

  findOne(id:any): Observable<any>{
    const url = `${this.API_URL}/${ROOM_TYPES}/${id}`;
    return this.http.get<any>(url);
  }

  findRoomType(id:any, date_in: any, date_out: any): Observable<any>{
    const url = `${this.API_URL}/${ROOM_TYPES}/get/${id}/${date_in}/${date_out}`;
    return this.http.get<any>(url);
  }

}

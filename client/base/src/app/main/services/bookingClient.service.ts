import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { BOOKINGS, CLIENT } from 'src/app/module/_mShared/model/url.class';

@Injectable({
  providedIn: 'root'
})
export class BookingClientService {

  // token = Auth.User('token');
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Authorization': `Bearer ${this.token}`
  //   })
  // }

  private API_URL = `http://127.0.0.1:8000/api/${CLIENT}`;


  constructor(private http: HttpClient) { }

  createBooking(data: any): Observable<any> {
    const url = `${this.API_URL}/${BOOKINGS}`;
    return this.http.post<any>(url, data);
  }

  findOne(id: any): Observable<any> {
    const url = `${this.API_URL}/${BOOKINGS}/${id}`;
    return this.http.get<any>(url);
  }


}

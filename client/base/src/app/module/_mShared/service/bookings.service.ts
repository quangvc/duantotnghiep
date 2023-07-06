import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN, BOOKINGS } from '../model/url.class';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  sessionUser:any = sessionStorage.getItem('user');
  user:any = JSON.parse(this.sessionUser);

  private API_URL = `http://127.0.0.1:8000/api/${ADMIN}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.user.token}`
    })
  }

  constructor(private http: HttpClient){}

getBookings(): Observable<any>{
  const url = `${this.API_URL}/${BOOKINGS}`;
  return this.http.get<any>(url, this.httpOptions);
}

findOne(id:any): Observable<any>{
  const url = `${this.API_URL}/${BOOKINGS}/${id}`;
  return this.http.get<any>(url, this.httpOptions);
}


}

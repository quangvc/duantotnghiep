import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN, BOOKINGS } from '../model/url.class';
import { Auth } from 'src/app/auth/_aShared/auth.class';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  token = Auth.User('token');

  private API_URL = `http://127.0.0.1:8000/api/${ADMIN}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
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

confirmBooking(id: any, data:any):Observable<any>{
  const url = `${this.API_URL}/${BOOKINGS}/${id}/confirm-booking`;
  return this.http.post<any>(url,data,this.httpOptions);
}

// getBookingDetail():Observable<any>{
//   const url = `${this.API_URL}/${BOOKINGS}/${id}/confirm-booking`;
//   return this.http.post<any>(url,data,this.httpOptions);
// }


}

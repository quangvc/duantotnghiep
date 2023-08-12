import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN, BOOKINGS, ROOMS } from '../model/url.class';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  token = Auth.User('token');

  private API_URL = `${environment.api}/api/${ADMIN}`;

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

countRoom(id:any,dataFrom:any, dateTo:any){
  const url = `${this.API_URL}/${ROOMS}/get/${id}/${dataFrom}/${dateTo}`;
  return this.http.get<any>(url);
}

// getBookingDetail():Observable<any>{
//   const url = `${this.API_URL}/${BOOKINGS}/${id}/confirm-booking`;
//   return this.http.post<any>(url,data,this.httpOptions);
// }


}

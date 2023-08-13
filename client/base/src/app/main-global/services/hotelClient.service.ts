import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLIENT, HOTELS, IMAGE, REGION } from 'src/app/module/_mShared/model/url.class'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelClientService {

  // sessionUser:any = sessionStorage.getItem('user');
  // user:any = JSON.parse(this.sessionUser);

  private API_URL = `${environment.api}/api`;
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.user.token}`
  //   })
  // }
  // private httpOption2 = {
  //   headers: new HttpHeaders({
  //     'Authorization': `Bearer ${this.user.token}`
  //   }),
  // }
  constructor(private http: HttpClient){}

  getHotels(): Observable<any>{
    const url = `${this.API_URL}/${CLIENT}/${HOTELS}`;
    return this.http.get<any>(url);
  }

  findOne(id:any): Observable<any>{
    const url = `${this.API_URL}/${CLIENT}/${HOTELS}/${id}`;
    return this.http.get<any>(url);
  }

  getHotelsByRegion(coupon_id:any): Observable<any>{
    const url = `${this.API_URL}/${CLIENT}/${HOTELS}/${REGION}/${coupon_id}`;
    return this.http.get<any>(url);
  }

  findHotels(region_id:any, date_in: any, date_out: any): Observable<any>{
    const url = `${this.API_URL}/${CLIENT}/${HOTELS}/get/${region_id}/${date_in}/${date_out}`;
    return this.http.get<any>(url);
  }

}

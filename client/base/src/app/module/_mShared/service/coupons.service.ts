import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN, COUPONS } from '../model/url.class';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  sessionUser:any = sessionStorage.getItem('user');
  user:any = JSON.parse(this.sessionUser);

  private API_URL = `http://127.0.0.1:8000/api/${ADMIN}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.user.token}`
    })
  }

  constructor(private http: HttpClient){}

  getCoupons(): Observable<any>{
    const url = `${this.API_URL}/${COUPONS}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  findOne(id:any): Observable<any>{
    const url = `${this.API_URL}/${COUPONS}/${id}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  createCoupon(data: any): Observable<any>{
    const url = `http://127.0.0.1:8000/api/admin/coupons`;
    return this.http.post<any>(url, data, this.httpOptions);
  }

  updateCoupon(id:any, data:any): Observable<any>{
    const url = `${this.API_URL}/${COUPONS}/${id}`;
    return this.http.put<any>(url, data, this.httpOptions)
  }

  deleteCoupon(id:any): Observable<any>{
    const url = `${this.API_URL}/${COUPONS}/${id}`;
    return this.http.delete(url, this.httpOptions)
  }

}

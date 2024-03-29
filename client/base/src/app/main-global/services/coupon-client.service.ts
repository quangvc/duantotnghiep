import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { CLIENT, COUPONS } from 'src/app/module/_mShared/model/url.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponClientService {
  private API_URL = `${environment.api}/api/${CLIENT}`;

  // token = Auth.User('token');
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Authorization': `Bearer ${this.token}`
  //   })
  // }

  constructor(private http: HttpClient){}

  getCoupons(): Observable<any>{
    const url = `${this.API_URL}/${COUPONS}`;
    return this.http.get<any>(url);
  }
  findByCode(name: any): Observable<any> {
    const url = `${this.API_URL}/${COUPONS}/check/${name}`;
    return this.http.get<any>(url);
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { CLIENT, ONE_PAYMENT, VN_PAYMENT } from 'src/app/module/_mShared/model/url.class';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  // token = Auth.User('token');

  private API_URL = `http://127.0.0.1:8000/api`;

  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Authorization': `Bearer ${this.token}`
  //   })
  // }

  constructor(private http: HttpClient){}

  // getPayments(): Observable<any>{
  //   const url = `${this.API_URL}/${PAYMENT}`;
  //   return this.http.get<any>(url, this.httpOptions);
  // }
  createVnPay(data: any): Observable<any>{
    const url = `${this.API_URL}/${VN_PAYMENT}`;
    return this.http.post<any>(url, data);
  }

  vnPayDone(data: any): Observable<any>{
    const url = `${this.API_URL}/payment-return?${data}`;
    return this.http.get<any>(url);
  }

  createOnePay(data: any): Observable<any>{
    const url = `${this.API_URL}/${ONE_PAYMENT}`;
    return this.http.post<any>(url, data);
  }

  onePayDone(data: any): Observable<any>{
    const url = `${this.API_URL}/payment-return?${data}`;
    return this.http.get<any>(url);
  }


  sendMail(booking_number: any): Observable<any>{
    const url = `${this.API_URL}/sendMail/${booking_number}`;
    return this.http.get<any>(url);
  }
}

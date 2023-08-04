import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { ADMIN } from '../model/url.class';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  token = Auth.User('token');

  private API_URL = `http://127.0.0.1:8000/api/${ADMIN}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  // thống kê doanh thu ngày trong khoảng thời gian
  statisticalByDate(dateFrom:any, dateTo:any): Observable<any> {
    const url = `${this.API_URL}/statistics/filter-by-date/${dateFrom}/${dateTo}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  // thống kê doanh thu hàng tháng
  statisticalByMonth(): Observable<any> {
    const url = `${this.API_URL}/statistics/monthly-revenue`;
    return this.http.get<any>(url, this.httpOptions);
  }

  // thống kê số phòng đã cho thuê hàng tháng
  statisticalByRoom(): Observable<any> {
    const url = `${this.API_URL}/statistics/monthly-room`;
    return this.http.get<any>(url, this.httpOptions);
  }

  // đếm số user mới
  statisticalByUser(): Observable<any> {
    const url = `${this.API_URL}/statistics/count-users`;
    return this.http.get<any>(url, this.httpOptions);
  }

  // doanh thu trong 1 tháng gần nhất
  statisticalByLastMonthRevenue(): Observable<any> {
    const url = `${this.API_URL}/statistics/last-month-revenue`;
    return this.http.get<any>(url, this.httpOptions);
  }

  // số phòng cho thuê trong 1 tháng gần nhất
  statisticalLastMonthCountRooms(): Observable<any> {
    const url = `${this.API_URL}/statistics/lm-count-room`;
    return this.http.get<any>(url, this.httpOptions);
  }
}

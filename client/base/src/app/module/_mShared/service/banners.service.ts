import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADMIN, BANNERS } from '../model/url.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannersService {

  sessionUser:any = sessionStorage.getItem('user');
  user:any = JSON.parse(this.sessionUser);

  private API_URL = `http://127.0.0.1:8000/api/${ADMIN}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.user.token}`
    })
  }

  constructor(private http: HttpClient){}

  getBanners(): Observable<any>{
    const url = `${this.API_URL}/${BANNERS}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  createBanner(data: any): Observable<any>{
    const url = `http://127.0.0.1:8000/api/admin/banners/`;
    return this.http.post<any>(url, data, this.httpOptions);
  }

  deleteBanner(id:any): Observable<any>{
    const url = `http://127.0.0.1:8000/api/admin/banners/${id}`;
    return this.http.delete<any>(url, this.httpOptions);
  }

}

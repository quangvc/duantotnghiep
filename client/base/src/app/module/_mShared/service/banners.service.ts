import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADMIN, BANNERS } from '../model/url.class';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/auth/_aShared/auth.class';

@Injectable({
  providedIn: 'root'
})
export class BannersService {

  token = Auth.User('token');

  private API_URL = `http://127.0.0.1:8000/api/${ADMIN}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  }

  constructor(private http: HttpClient){}

  getBanners(): Observable<any>{
    const url = `${this.API_URL}/${BANNERS}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  createBanner(data: any): Observable<any>{
    const url = `${this.API_URL}/${BANNERS}`;
    return this.http.post<any>(url, data, this.httpOptions);
  }

  deleteBanner(id:any): Observable<any>{
    const url = `${this.API_URL}/${BANNERS}/${id}`;
    return this.http.delete<any>(url, this.httpOptions);
  }

  changeStatus(id:any): Observable<any>{
    const url = `${this.API_URL}/${BANNERS}/${id}/changeStatus`;
    return this.http.put<any>(url, this.httpOptions);
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { ADMIN } from '../model/url.class';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  token = Auth.User('token');

  private API_URL = `${environment.api}/api/${ADMIN}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getSupport(): Observable<any> {
    const url = `${this.API_URL}/support`;
    return this.http.get<any>(url, this.httpOptions);
  }

  changeStatus(id:any): Observable<any> {
    const url = `${this.API_URL}/support/${id}`;
    return this.http.put<any>(url,id,this.httpOptions);
  }

}

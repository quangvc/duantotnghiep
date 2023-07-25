import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { CLIENT, USERS } from 'src/app/module/_mShared/model/url.class';

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {
  private API_URL = `http://127.0.0.1:8000/api/${CLIENT}`;




  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const url = `${this.API_URL}/${USERS}`;
    return this.http.get<any>(url);
  }

  getUser(id: any): Observable<any> {
    const url = `${this.API_URL}/${USERS}/${id}`;
    const sessionUser = sessionStorage.getItem('user');
    const user = sessionUser ? JSON.parse(sessionUser) : null;
    const httpOptions = user ? {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${user.token}`
      })
    } : {};
    return this.http.get<any>(url, httpOptions);
  }

  Update(id:any, data:any): Observable<any>{
    const url = `${this.API_URL}/${USERS}/${id}`;
    const sessionUser = sessionStorage.getItem('user');
    const user = sessionUser ? JSON.parse(sessionUser) : null;
    const httpOptions = user ? {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${user.token}`
      })
    } : {};
    return this.http.post(url,data,httpOptions)
  }
}

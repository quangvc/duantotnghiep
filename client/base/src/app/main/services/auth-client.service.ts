import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { CLIENT, USERS } from 'src/app/module/_mShared/model/url.class';

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {

  token = Auth.User('token');

  private API_URL = `http://127.0.0.1:8000/api/${CLIENT}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };



  constructor(private http: HttpClient) {}

  getUser(id: any): Observable<any> {
    const url = `${this.API_URL}/${USERS}/${id}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  Update(id:any, data:any): Observable<any>{
    const url = `${this.API_URL}/${USERS}/${id}`;
    return this.http.post(url,data,this.httpOptions)
  }
}

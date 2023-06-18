import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USERS } from '../model/url.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  sessionUser: any = sessionStorage.getItem('user');
  user: any = JSON.parse(this.sessionUser);

  private API_URL = 'http://127.0.0.1:8000/api';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.user.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const url = `${this.API_URL}/${USERS}`;
    return this.http.get<any>(url, this.httpOptions);
  }

}

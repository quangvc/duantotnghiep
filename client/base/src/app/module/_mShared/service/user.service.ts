import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ADMIN, USERS } from '../model/url.class';
import { Auth } from 'src/app/auth/_aShared/auth.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token = Auth.User('token');

  private API_URL = `http://127.0.0.1:8000/api/${ADMIN}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  public $hotelId = new BehaviorSubject<any>(null);



  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const url = `${this.API_URL}/${USERS}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  changeStatus(id:any, data?:any): Observable<any>{
    const url = `${this.API_URL}/${USERS}/${id}/change-status`;
    return this.http.put(url,data,this.httpOptions)
  }

  changeRole(id:any, role:any): Observable<any>{
    const url = `${this.API_URL}/${USERS}/${id}`;
    return this.http.post(url, role, this.httpOptions);
  }

  updateUser(data:any, id:any):Observable<any>{
    const url = `${this.API_URL}/${USERS}/${id}`;
    return this.http.post(url, data, this.httpOptions);
  }

}

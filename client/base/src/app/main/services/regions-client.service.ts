import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLIENT, REGIONS } from 'src/app/module/_mShared/model/url.class';

@Injectable({
  providedIn: 'root'
})
export class RegionsClientService {
  private API_URL = `http://127.0.0.1:8000/api/${CLIENT}`;

  // sessionUser:any = sessionStorage.getItem('user');
  // user:any = JSON.parse(this.sessionUser);


  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.user.token}`
  //   })
  // }

  constructor(private http: HttpClient){}

  getRegions(): Observable<any>{
    const url = `${this.API_URL}/${REGIONS}`;
    return this.http.get<any>(url);
  }

  findOne(id:any): Observable<any>{
    const url = `${this.API_URL}/${REGIONS}/${id}`;
    return this.http.get<any>(url);
  }

}

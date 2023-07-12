import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BANNERS, CLIENT } from 'src/app/module/_mShared/model/url.class';

@Injectable({
  providedIn: 'root'
})
export class BannersClientService {
  private API_URL = `http://127.0.0.1:8000/api/${CLIENT}`;

  // sessionUser:any = sessionStorage.getItem('user');
  // user:any = JSON.parse(this.sessionUser);


  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Authorization': `Bearer ${this.user.token}`
  //   })
  // }

  constructor(private http: HttpClient){}

  getBanners(): Observable<any>{
    const url = `${this.API_URL}/${BANNERS}`;
    return this.http.get<any>(url);
  }

}

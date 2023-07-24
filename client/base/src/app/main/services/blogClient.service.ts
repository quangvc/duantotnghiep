import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLIENT, BLOGS, IMAGE } from 'src/app/module/_mShared/model/url.class'

@Injectable({
  providedIn: 'root'
})
export class BlogClientService {

  // sessionUser:any = sessionStorage.getItem('user');
  // user:any = JSON.parse(this.sessionUser);

  private API_URL = `http://127.0.0.1:8000/api/${CLIENT}`;

  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Authorization': `Bearer ${this.user.token}`
  //   })
  // }

  constructor(private http: HttpClient){}

  getBlogs(): Observable<any>{
    const url = `${this.API_URL}/${BLOGS}`;
    return this.http.get<any>(url);
  }

  findOne(slug:any): Observable<any>{
    const url = `${this.API_URL}/${BLOGS}/${slug}`;
    return this.http.get<any>(url);
  }
}

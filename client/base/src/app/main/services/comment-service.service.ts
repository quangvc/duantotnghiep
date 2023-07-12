import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLIENT, COMMENTS } from 'src/app/module/_mShared/model/url.class';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  private API_URL = `http://127.0.0.1:8000/api/${CLIENT}`;

  // Phải kiểm tra xem user có đăng nhập hay không
  sessionUser:any = sessionStorage.getItem('user');
  user:any = JSON.parse(this.sessionUser);
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.user.token}`
    })
  }

  constructor(private http: HttpClient){}

  getComments(): Observable<any>{
    const url = `${this.API_URL}/${COMMENTS}`;
    return this.http.get<any>(url);
  }

  findOne(id:any): Observable<any>{
    const url = `${this.API_URL}/${COMMENTS}/${id}`;
    return this.http.get<any>(url);
  }

  createComment(data: any): Observable<any>{
    const url = `${this.API_URL}/${COMMENTS}`;
    return this.http.post<any>(url, data, this.httpOptions);
  }
}

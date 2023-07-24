import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLIENT, COMMENTS, REPLY } from 'src/app/module/_mShared/model/url.class';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  private API_URL = `http://127.0.0.1:8000/api/${CLIENT}`;

  //Phải kiểm tra xem user có đăng nhập hay không
  // sessionUser:any = sessionStorage.getItem('user');
  // user:any = JSON.parse(this.sessionUser);
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Authorization': `Bearer ${this.user.token}`
  //   })
  // }

  constructor(private http: HttpClient){}

  getCommentByBlog(blog_id: any): Observable<any>{
    const url = `${this.API_URL}/${COMMENTS}/${blog_id}`;
    return this.http.get<any>(url);
  }

  findOne(id:any): Observable<any>{
    const url = `${this.API_URL}/${COMMENTS}/${id}`;
    return this.http.get<any>(url);
  }

  createComment(data: any): Observable<any>{
    const url = `${this.API_URL}/${COMMENTS}`;
    const sessionUser = sessionStorage.getItem('user');
    const user = sessionUser ? JSON.parse(sessionUser) : null;
    const httpOptions = user ? {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${user.token}`
      })
    } : {};
    return this.http.post<any>(url, data, httpOptions);
  }

  getReplyByComment(cmt_id: any): Observable<any>{
    const url = `${this.API_URL}/${COMMENTS}/${REPLY}/${cmt_id}`;
    return this.http.get<any>(url);
  }

  createReply(parent_id: any, data: any): Observable<any>{
    const url = `${this.API_URL}/${COMMENTS}/${parent_id}`;
    const sessionUser = sessionStorage.getItem('user');
    const user = sessionUser ? JSON.parse(sessionUser) : null;
    const httpOptions = user ? {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${user.token}`
      })
    } : {};
    return this.http.post<any>(url, data, httpOptions);
  }
}

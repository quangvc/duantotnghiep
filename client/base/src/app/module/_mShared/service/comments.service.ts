import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { ADMIN, COMMENTS } from '../model/url.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  token = Auth.User('token');

  private API_URL = `http://127.0.0.1:8000/api/${ADMIN}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  }

  constructor(private http: HttpClient){}

  getComments(): Observable<any>{
    const url = `${this.API_URL}/${COMMENTS}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  findOne(id:any): Observable<any>{
    const url = `${this.API_URL}/${COMMENTS}/${id}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  delComment(id: any): Observable<any>{
    const url = `${this.API_URL}/${COMMENTS}/${id}`;
    return this.http.delete<any>(url, this.httpOptions);
  }

}

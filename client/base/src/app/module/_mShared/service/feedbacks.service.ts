import { Injectable } from '@angular/core';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { ADMIN, FEEDBACK } from '../model/url.class';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {

  token = Auth.User('token');

  private API_URL = `${environment.api}/api/${ADMIN}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  }

  constructor(private http: HttpClient){}

  getFeedbacks(): Observable<any>{
    const url = `${this.API_URL}/${FEEDBACK}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  findOne(id:any): Observable<any>{
    const url = `${this.API_URL}/${FEEDBACK}/${id}`;
    return this.http.get<any>(url, this.httpOptions);
  }

}

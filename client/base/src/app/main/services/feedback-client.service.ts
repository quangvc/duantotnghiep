import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLIENT, FEEDBACK, FEEDBACKS } from 'src/app/module/_mShared/model/url.class';

@Injectable({
  providedIn: 'root'
})
export class FeedbackClientService {

  private API_URL = `http://127.0.0.1:8000/api/${CLIENT}`;

  // token = Auth.User('token');
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Authorization': `Bearer ${this.token}`
  //   })
  // }

  constructor(private http: HttpClient){}

  getFeedbacks(): Observable<any>{
    const url = `${this.API_URL}/${FEEDBACKS}`;
    return this.http.get<any>(url);
  }

  findOne(id:any): Observable<any>{
    const url = `${this.API_URL}/${FEEDBACKS}/${id}`;
    return this.http.get<any>(url);
  }

  createFeedback(data: any): Observable<any>{
    const url = `${this.API_URL}/${FEEDBACKS}`;
    return this.http.post<any>(url, data);
  }

  getFeedbackByHotel(hotel_id: any): Observable<any>{
    const url = `${this.API_URL}/${FEEDBACKS}/hotel/${hotel_id}`;
    return this.http.get<any>(url, hotel_id);
  }

  getHotelRating(hotel_id: any): Observable<any>{
    const url = `${this.API_URL}/${FEEDBACKS}/avg/${hotel_id}`;
    return this.http.get<any>(url, hotel_id);
  }

}

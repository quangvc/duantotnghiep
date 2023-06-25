import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN, IMAGE } from '../model/url.class';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

constructor(
  private http: HttpClient
) { }

sessionUser:any = sessionStorage.getItem('user');
user:any = JSON.parse(this.sessionUser);

private API_URL = `http://127.0.0.1:8000/api`;

private httpOptionImage = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${this.user.token}`
  }),
}

getImages(): Observable<any>{
  const url = `${this.API_URL}/${ADMIN}/${IMAGE}`;
  return this.http.get<any>(url, this.httpOptionImage);
}

//Add image hotel
addImage(id:any, image:any): Observable<any>{
  const url = `${this.API_URL}/${ADMIN}/${IMAGE}/hotel/${id}`;
  return this.http.post(url, image, this.httpOptionImage);
}

updateImage(hotel_id:any, image:any): Observable<any>{
  const url = `${this.API_URL}/${ADMIN}/${IMAGE}/${hotel_id}`;
  return this.http.put(url, image, this.httpOptionImage);
}

addImageRoomType(id:any, image:any): Observable<any>{
  const url = `${this.API_URL}/${ADMIN}/${IMAGE}/room-type/${id}`;
  return this.http.post(url, image, this.httpOptionImage);
}


}

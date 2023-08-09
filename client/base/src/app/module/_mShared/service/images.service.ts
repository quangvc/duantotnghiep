import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ADMIN, IMAGE } from '../model/url.class';
import { Auth } from 'src/app/auth/_aShared/auth.class';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

constructor(
  private http: HttpClient
) { }

public $image = new BehaviorSubject<any>(null);

token = Auth.User('token');

private API_URL = `http://127.0.0.1:8000/api`;

private httpOptionImage = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
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

updateImage(imageId:any, image:any): Observable<any>{
  const url = `${this.API_URL}/${ADMIN}/${IMAGE}/${imageId}`;
  return this.http.put(url, image, this.httpOptionImage);
}

//Add image roomType
addImageRoomType(id:any, image:any): Observable<any>{
  const url = `${this.API_URL}/${ADMIN}/${IMAGE}/room-type/${id}`;
  return this.http.post(url, image, this.httpOptionImage);
}

deleteImage(imageId:any): Observable<any>{
  const url = `${this.API_URL}/${ADMIN}/${IMAGE}/${imageId}`;
  return this.http.delete(url, this.httpOptionImage);
}


}

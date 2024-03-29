import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CLIENT, IMAGE } from 'src/app/module/_mShared/model/url.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesClientService {

constructor(
  private http: HttpClient
) { }

public $image = new BehaviorSubject<any>(null);

private API_URL = `${environment.api}/api`;


// sessionUser:any = sessionStorage.getItem('user');
// user:any = JSON.parse(this.sessionUser);


// private httpOptionImage = {
//   headers: new HttpHeaders({
//     'Authorization': `Bearer ${this.user.token}`
//   }),
// }

getImagesRoomType(id: any): Observable<any>{
  const url = `${this.API_URL}/${CLIENT}/${IMAGE}/room-type/${id}`;
  return this.http.get<any>(url);
}



}

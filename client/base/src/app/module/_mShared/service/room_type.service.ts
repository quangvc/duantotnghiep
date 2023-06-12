import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

constructor(
  private http: HttpClient
) { }

URL = 'http://localhost:3000/room_type';

getRoomType(): Observable<any>{
  return this.http.get(this.URL)
}

createRoomType(data: any): Observable<any>{
  return this.http.post(this.URL, data);
}

updateRoomType(id:any, data:any): Observable<any>{
  return this.http.put(`${this.URL}/${id}`,data)
}

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  constructor(
    private http: HttpClient
  ) { }

  URL = 'http://localhost:3000/hotels';

  getHotels(): Observable<any>{
    return this.http.get(this.URL)
  }

  createHotel(data: any): Observable<any>{
    return this.http.post(this.URL, data);
  }

  updateHotel(id:any, data:any): Observable<any>{
    return this.http.put(`${this.URL}/${id}`,data)
  }

}

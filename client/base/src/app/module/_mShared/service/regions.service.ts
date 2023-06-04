import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  constructor(
    private http: HttpClient
  ) { }

  URL = 'http://localhost:3000/regions';

  getRegion(): Observable<any>{
    return this.http.get(this.URL)
  }

  createRegion(data: any): Observable<any>{
    return this.http.post(this.URL, data);
  }

  register(data: any) {
    return this.http.post(this.URL, data);
  }

  updateRegion(id:any, data:any): Observable<any>{
    return this.http.put(`${this.URL}/${id}`,data)
  }

}

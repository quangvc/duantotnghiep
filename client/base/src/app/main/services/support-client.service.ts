import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLIENT, SUPPORT } from 'src/app/module/_mShared/model/url.class';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupportClientService {
  private API_URL = `http://127.0.0.1:8000/api/${CLIENT}`;
  constructor(private http: HttpClient) { }

  createSupport(data: any): Observable<any>{
    const url = `${this.API_URL}/${SUPPORT}`;
    return this.http.post<any>(url, data);
  }
}

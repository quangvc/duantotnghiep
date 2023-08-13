import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLIENT, SUPPORT } from 'src/app/module/_mShared/model/url.class';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportClientService {
  private API_URL = `${environment.api}/api/${CLIENT}`;
  constructor(private http: HttpClient) { }

  createSupport(data: any): Observable<any>{
    const url = `${this.API_URL}/${SUPPORT}`;
    return this.http.post<any>(url, data);
  }
}

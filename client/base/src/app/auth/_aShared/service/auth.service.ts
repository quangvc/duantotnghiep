import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  sessionUser:any = sessionStorage.getItem('user');
  user:any = JSON.parse(this.sessionUser);

  private API_URL = `${environment.api}/api`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.user ? this.user.token : null}`
    })
  }

  constructor(private http: HttpClient) { }

  URL2 = `${environment.api}/api/users`;
  URL_LOGIN = `${environment.api}/api/login`;
  URL_LOGOUT = `${environment.api}/api/logout`;

  // getUser() {
  //   return this.http.get(this.URL);
  // }

  // register(data: any) {
  //   return this.http.post(this.URL, data);d
  // }

  // getLoginByUsername(username: any) {
  //   return this.http.get(this.URL +'?username=' + username);
  // }

  createLogin(data:any){
    return this.http.post(this.URL_LOGIN,data);
  }

  createLogout(httpOptions:any){
    return this.http.post(this.URL_LOGOUT, null, httpOptions)
  }

  isLogin(){
    return sessionStorage.getItem('username') != null;
  }

  getUserRole(){
    return sessionStorage.getItem('userRole') != null ? sessionStorage.getItem('userRole') : '';
  }

  sendResetLink(data:any): Observable<any>{
    const url = `${this.API_URL}/send-reset-link`;
    return this.http.post<any>(url, data, this.httpOptions)
  }

  register(account:any): Observable<any>{
    const url = `${this.API_URL}/register`;
    return this.http.post<any>(url, account)
  }

  updatePass(data:any, httpOptions:any): Observable<any>{
    const url = `${this.API_URL}/reset-password`;
    return this.http.post<any>(url, data, httpOptions);
  }
}

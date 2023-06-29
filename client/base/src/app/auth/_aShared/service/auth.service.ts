import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  sessionUser:any = sessionStorage.getItem('user');
  user:any = JSON.parse(this.sessionUser);

  private API_URL = 'http://127.0.0.1:8000/api';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.user ? this.user.token : null}`
    })
  }

  constructor(private http: HttpClient) { }

  URL = 'http://localhost:3000/user/';
  URL2 = 'http://127.0.0.1:8000/api/users';
  URL_LOGIN = 'http://127.0.0.1:8000/api/login';
  URL_LOGOUT = 'http://127.0.0.1:8000/api/logout';

  getUser() {
    return this.http.get(this.URL);
  }

  register(data: any) {
    return this.http.post(this.URL, data);
  }

  getLoginByUsername(username: any) {
    return this.http.get(this.URL +'?username=' + username);
  }

  createLogin(data:any){
    return this.http.post(this.URL_LOGIN,data);
  }

  createLogout(){
    return this.http.post(this.URL_LOGOUT, null, this.httpOptions)
  }

  isLogin(){
    return sessionStorage.getItem('username') != null;
  }

  getUserRole(){
    return sessionStorage.getItem('userRole') != null ? sessionStorage.getItem('userRole') : '';
  }
}

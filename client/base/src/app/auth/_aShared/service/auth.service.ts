import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  URL = 'http://localhost:3000/user/';

  getUser() {
    return this.http.get(this.URL);
  }

  register(data: any) {
    return this.http.post(this.URL, data);
  }

  getLoginByUsername(username: any) {
    return this.http.get(this.URL +'?username=' + username);
  }

  isLogin(){
    return sessionStorage.getItem('username') != null;
  }

  getUserRole(){
    return sessionStorage.getItem('userRole') != null ? sessionStorage.getItem('userRole') : '';
  }
}

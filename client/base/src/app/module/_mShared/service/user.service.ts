import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../model/userDto.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(
  private http: HttpClient
) { }

URL = 'http://localhost:3000/users/';

getUser(): Observable<UserDto>{
  return this.http.get(this.URL)
}

}

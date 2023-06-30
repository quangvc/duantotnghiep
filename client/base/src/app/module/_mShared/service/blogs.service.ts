import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN, BLOGS, IMAGE } from '../model/url.class';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  sessionUser:any = sessionStorage.getItem('user');
  user:any = JSON.parse(this.sessionUser);

  private API_URL = `http://127.0.0.1:8000/api/${ADMIN}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.user.token}`
    })
  }

  constructor(private http: HttpClient){}

  getBlogs(): Observable<any>{
    const url = `${this.API_URL}/${BLOGS}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  findOne(id:any, slug:any): Observable<any>{
    const url = `${this.API_URL}/${BLOGS}/${slug}/${id}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  createBlog(data: any): Observable<any>{
    const url = `http://127.0.0.1:8000/api/admin/blogs`;
    return this.http.post<any>(url, data, this.httpOptions);
  }

  // Blog blog

  updateBlog(id:any, data:any): Observable<any>{
    const url = `${this.API_URL}/${BLOGS}/${id}`;
    return this.http.put<any>(url, data, this.httpOptions)
  }

  deleteBlog(id:any): Observable<any>{
    const url = `${this.API_URL}/${BLOGS}/${id}`;
    return this.http.delete(url, this.httpOptions)
  }

  getImage(): Observable<any>{
    const url = `${this.API_URL}/${ADMIN}/${IMAGE}`;
    return this.http.get<any>(url, this.httpOptions);
  }
}

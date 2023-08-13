import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  logged: any
  notLogin: any
  userData:any = sessionStorage.getItem('user');
  user = JSON.parse(this.userData);
  path: any


  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    this.checkLogin();

  }
  checkLogin(){
    let userLogged:any = sessionStorage.getItem('user');
    let user = JSON.parse(userLogged);


    if (user && user.role && user.role.length > 0) {
      if (user.role[0] === "admin") {
        this.path = 'profile'
      }else{
        this.path = 'profile'
      }
    } else {
      // Xử lý khi giá trị không xác định
      // alert('User or role is undefined');
    }

  }


}

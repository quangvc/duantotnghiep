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
    console.log(this.user);

  }
  checkLogin(){
    let userLogged:any = sessionStorage.getItem('user');
    let user = JSON.parse(userLogged);
    console.log(user);

    if(user.user.name === "Admin"){
      this.path = 'nine'
    }else{
      this.path = 'profile'
    }
  }


}

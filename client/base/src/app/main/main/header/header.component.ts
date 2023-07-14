import { Component, OnInit } from '@angular/core';

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
  ngOnInit() {
    // this.checkLogin();
    console.log(this.user);

  }
  // checkLogin(){
  //   if(this.user){
  //     console.log(this.user);
  //     this.notLogin =false;
  //   }else{
  //     this.notLogin = true;
  //   }
  // }


}

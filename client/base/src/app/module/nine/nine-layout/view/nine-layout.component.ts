import { async } from '@angular/core/testing';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom } from 'rxjs';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { AuthService } from 'src/app/auth/_aShared/service/auth.service';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';

@Component({
  selector: 'app-nine-layout',
  templateUrl: './nine-layout.component.html',
  styleUrls: ['./nine-layout.component.scss']
})
export class NineLayoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService,
  ) { }
  isCollapsed = true;

  flexWidth80: string = 'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;';
  flexWidth230: string = 'flex: 0 0 230px; max-width: 230px; min-width: 230px; width: 230px;';

  menus: MenuItem[] = []

  username = Auth.User('user').name;

  displayInf: boolean = false;

  ngOnInit() {
    this.getMenus();
    this.checkLogin()
  }

  async checkLogin(){
    let role = await Auth.User('role');
    if(role === "admin"){}
    else if(role === "manager"){}
    else{
      this.message.warning('Bạn không đủ quyền truy cập !!');
      this.router.navigate(['home'])
    }

  }

  getMenus(){
    this.menus = [
      {
        label: "Dashboard",
        icon: 'dashboard',
        routerLink: "/nine"
      },
      {
        label: "Quản lý người dùng",
        icon: 'user',
        items: [
          {
            label: "Danh sách người dùng",
            routerLink: "user",
          },
          {
            label: "Danh sách quyền",
            routerLink: "role",
          },
          {
            label: "Phân quyền",
            routerLink: "user-role",
          }
        ]
      },
      {
        label: "Quản lý chung",
        icon: 'home',
        items: [
          {
            label: "Quản lý khu vực",
            routerLink: "regions",
          },
          {
            label: "Quản lý khách sạn",
            routerLink: "hotels",
          }
        ]
      },
      {
        label: "Quản lý đặt phòng ",
        icon: 'form',
        items: [
          // {
          //   label: "Quản lý loại phòng",
          //   routerLink: "room-types",
          // },
          // {
          //   label: "Danh sách phòng",
          //   routerLink: "rooms",
          // },
          {
            label: "Đặt phòng",
            routerLink: "bookings",
          }
        ]
      },
      {
        label: "Quản lý Voucher ",
        icon: 'gift',
        items: [
          {
            label: "Quản lý mã giảm giá",
            routerLink: "coupons",
          },
        ]
      },
      {
        label: "Quản lý bài đăng ",
        icon: 'comment',
        items: [
          {
            label: "Quản lý blog",
            routerLink: "blogs",
          },
          // {
          //   label: "Quản lý bình luận",
          //   routerLink: "comments",
          // },
          {
            label: "Quản lý Feedback",
            routerLink: "feedbacks",
          }
        ]
      },
      {
        label: "Quản lý Page ",
        icon: 'setting',
        items: [
          {
            label: "Quản lý banner",
            routerLink: "banners",
          },
        ]
      },
    ]
  }

  async logOut(){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.User().token}`
      })
    }
    await firstValueFrom(this.authService.createLogout(httpOptions));
    await sessionStorage.removeItem('user');
    this.router.navigate(['login'])
  }

  confirm(): void {
    this.logOut();
  }

  viewInf(){
    this.displayInf = true;
  }

  eventSubmit(event:any){
    this.displayInf = false;
  }

  cancel(): void {
  }

}


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/_aShared/service/auth.service';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';

@Component({
  selector: 'app-nine-layout',
  templateUrl: './nine-layout.component.html',
  styleUrls: ['./nine-layout.component.scss']
})
export class NineLayoutComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router,private nzMessageService: NzMessageService) { }
  isCollapsed = true;

  flexWidth80: string = 'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;';
  flexWidth230: string = 'flex: 0 0 230px; max-width: 230px; min-width: 230px; width: 230px;';

  menus: MenuItem[] = []

  ngOnInit() {
    this.getMenus();
  }

  getMenus(){
    this.menus = [
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
            label: "Quản lý khách sạn",
            routerLink: "hotels",
          },
          {
            label: "Quản lý khu vực",
            routerLink: "regions",
          },
          {
            label: "Quản lý phòng",
            routerLink: "rooms",
          },
          {
            label: "Quản lý loại phòng",
            routerLink: "room-types",
          },
          {
            label: "Quản lý mã giảm giá",
            routerLink: "coupons",
          },
          {
            label: "Quản lý blog",
            routerLink: "blogs",
          }
        ]
      },
      {
        label: "Quản lý giao diện ",
        icon: 'dribbble',
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
    await firstValueFrom(this.authService.createLogout());
    sessionStorage.clear();
    this.router.navigate(['login'])
  }

  confirm(): void {
    this.logOut();
  }

  cancel(): void {
  }

}


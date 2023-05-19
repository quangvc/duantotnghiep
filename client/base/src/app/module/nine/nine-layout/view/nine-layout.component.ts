import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';

@Component({
  selector: 'app-nine-layout',
  templateUrl: './nine-layout.component.html',
  styleUrls: ['./nine-layout.component.scss']
})
export class NineLayoutComponent implements OnInit {

  constructor() { }
  isCollapsed = true;

  flexWidth80: string = 'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;';
  flexWidth230: string = 'flex: 0 0 230px; max-width: 230px; min-width: 230px; width: 230px;';

  menus: MenuItem[] = [];

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
    ]
  }

}


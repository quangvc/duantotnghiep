import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { UserDto } from 'src/app/module/_mShared/model/userDto.class';
import { UserService } from 'src/app/module/_mShared/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }

  user: any;
  menus: MenuItem[] = [];

  isVisibleUser: boolean = false;


  users: any;

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.userService.getUser().subscribe((res) => {
      this.users = res;
      // console.log(this.users);
    })
  }

  dropdownItemsButton(data:any){
    this.menus = [
      {
        label: "Chỉnh sửa",
        command: () => {
          this.showModalEditUser(data);
        },
      },
      { separator: true},
      {
        label: "Xóa",
        command: () => {
          console.log(3);
        },
      },
    ]
  }

  showModalAddUser(){
    this.isVisibleUser = true;
  }

  showModalEditUser(user:UserDto){
    this.user = user;
    this.isVisibleUser = true;
  }

  submitUser(){
    this.isVisibleUser = false;
  }

  closeUser(){
    this.isVisibleUser = false;
  }

}

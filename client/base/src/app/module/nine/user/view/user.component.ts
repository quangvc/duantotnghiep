import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { UserDto } from 'src/app/module/_mShared/model/userDto.class';
import { UserService } from 'src/app/module/_mShared/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  constructor(private userService: UserService) { }

  user: any;
  menus: MenuItem[] = [];

  isVisibleUser: boolean = false;


  users: any;

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    let obs = this.userService.getUsers().subscribe((res) => {
      this.users = res.data;
      // console.log(this.users);
    })

    this.subscription.add(obs);;
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

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}

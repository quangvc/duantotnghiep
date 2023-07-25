import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { UserDto } from 'src/app/module/_mShared/model/userDto.class';
import { UserService } from 'src/app/module/_mShared/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  constructor(
    private userService: UserService,
    private modal: NzModalService,
    private message: NzMessageService,
  ) {}

  user: any;
  menus: MenuItem[] = [];

  isVisibleUser: boolean = false;

  confirmModal?: NzModalRef;

  users: any;

  role: boolean = false;

  displayPermision: boolean = false;

  userID: any;
  Urole: any;
  hotelID: any;

  ngOnInit() {
    this.getUser();
    this.checkRole();
  }

  checkRole(){
    let role = Auth.User('role');
    switch (role) {
      case "admin":
        return this.role = true;
        break;
      default:
        return this.role = false;
        break;
    }
  }

  getUser() {
    let obs = this.userService.getUsers().subscribe((res) => {
      this.users = res.data;

      for (const item of this.users) {
        if(item.active == "Active"){
          item.active = true;
        }else if(item.active == "Disabled"){
          item.active = false;
        }

        }
        console.log(this.users)
    });

    this.subscription.add(obs);
  }

  dropdownItemsButton(data: any) {
    this.menus = [
      {
        label: 'Chỉnh sửa',
        command: () => {
          this.showModalEditUser(data);
        },
      },
      {
        label: 'Phân quyền',
        command: () => {
          this.showPermision(data);
        },
      },
      { separator: true},
      {
        label: 'Xóa',
        command: () => {

        },
      },
    ];
  }

  showModalAddUser() {
    this.isVisibleUser = true;
  }

  showModalEditUser(user: UserDto) {
    this.user = user;
    this.isVisibleUser = true;
  }

  confirmChangeStatus(event:any, data:any){

    this.confirmModal = this.modal.confirm({
      nzTitle: `Xác thực sự kiện !!`,
      nzContent: 'Xác nhận thay đổi trạng thái ?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.changeStatus(data);
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });

  }
  changeStatus(data:any){

    let obs = this.userService.changeStatus(data.id).subscribe({
      next: (res) => {
        this.message.create(SUCCESS, "Cập nhật thành công !!");
        this.getUser();
      },
      error: (err) => {
        this.getUser();
        this.message.create(ERROR, err.error.message);
      }
    })
    this.subscription.add(obs);
  }

  showPermision(data: any){
    this.displayPermision = true;
    this.userID = data.id;
    this.Urole = data.roles;
    this.hotelID = data.hotelId;
  }

  submitUser() {
    this.isVisibleUser = false;
  }

  closeUser() {
    this.isVisibleUser = false;
    this.displayPermision = false;
    this.getUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

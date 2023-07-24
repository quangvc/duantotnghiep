import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { UserDto } from 'src/app/module/_mShared/model/userDto.class';
import { UserService } from 'src/app/module/_mShared/service/user.service';
import { AssignHotelComponent } from '../assign-hotel/assign-hotel.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  @ViewChild(AssignHotelComponent) hotel: AssignHotelComponent;

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

  changeRole(event: any,data:any){
    let role = event.target.value;
    let rank;

    if(data.roles[0].name != "manager"){
      rank = "thăng cấp lên manager"
    }
    if(data.roles[0].name != "client"){
      rank = "hạ cấp xuống client"
    }
    this.confirmModal = this.modal.confirm({
      nzTitle: `Bạn có muốn ${data.name} ${rank}`,
      nzContent: role == "client" ? "Bấm OK để xác nhận !!" : AssignHotelComponent,
      nzComponentParams: {
        userId: data.id,
        txtRole: role
      },
      nzOnOk: () =>
        new Promise(async(resolve, reject) => {
          this.userService.$hotelId.subscribe( async(hotelId) => {
            if(role == "manager"){
              if(hotelId){
                await this.changeRoleUser(data, role);
                await this.updateHotelIdForUser(data.id, hotelId);
              }else{
                this.message.create(ERROR, `Cập nhật không thành công`);
              }
            }

            if(role == "client"){
                await this.changeRoleUser(data, role);
                await this.updateHotelIdForUser(data.id, hotelId);
            }

            this.getUser()
            setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
          })
        }).catch(),
      nzOnCancel: () => {
        this.getUser()
      }
    });
  }

  updateHotelIdForUser(userId:any, hotelId:any){
    let data = {
      hotel_id: hotelId ? hotelId : 0
    };
    console.log(hotelId)
    this.userService.updateUser(data, userId).subscribe({
      next: (res) => {
        this.message.create(SUCCESS, `SUCCESS, Assign hotel for User`);
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })
  }

  changeRoleUser(data:any, role:any){
    let obs = this.userService.changeRole(data.id, {role: role}).subscribe({
      next: (res) => {
        this.message.create(SUCCESS, `Cập nhật người dùng thành công.`)
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })

    this.subscription.add(obs);
  }

  submitUser() {
    this.isVisibleUser = false;
  }

  closeUser() {
    this.isVisibleUser = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

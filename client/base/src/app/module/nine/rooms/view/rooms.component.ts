import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subscription, firstValueFrom } from 'rxjs';
import { NineStatus } from 'src/app/module/_mShared/enum/enum';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { Enum } from 'src/app/module/_mShared/service/static/enum.service';
import { RoomTypeService } from 'src/app/module/_mShared/service/room_type.service';
import { RoomsService } from 'src/app/module/_mShared/service/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, OnDestroy {

  @Input() room: any[] = [];

  private subscription = new Subscription();

  displayCreateUpdateRoom: boolean = false;

  constructor(
    private roomsService: RoomsService,
    private roomTypeService: RoomTypeService,
    private message: NzMessageService,
    private modal: NzModalService
    ) {}

  confirmModal?: NzModalRef;

  rooms: any[] = [];
  menus: MenuItem[] = [];

  statusOption: any;
  roomId: any;

  ngOnInit() {
    this.getRooms();
    this.getOptionEnum();
  }

  getOptionEnum(){
    this.statusOption = Enum.convertEnum(NineStatus);
  }

  dropdownItemsButton(data:any){
    this.menus = [
      {
        label: "Chỉnh sửa",
        command: () => {
          this.editRoom(data);
        },
      },
      { separator: true},
      {
        label: "Xóa",
        command: () => {
          this.confirmDelete(data);
        },
      },
    ]
  }

  getRooms() {
    // this.viewNameStatus();
  }

  // async viewNameStatus(){
  //   for (const item of this.room) {
  //     this.statusOption.forEach((status:any) => {
  //       if(item.status == status.value){
  //         item.txtStatus = status.text;
  //       }
  //     });
  //   }
  // }


  addRoom() {
    this.displayCreateUpdateRoom = true;
    this.roomId = null;
  }

  editRoom(room:any){
    this.displayCreateUpdateRoom = true;
    this.roomId = room.id;
  }

  confirmDelete(room:any){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Xác nhận xóa phòng ${room.room_number} ?`,
      nzContent: 'Khi bấm nút OK, cửa sổ sẽ đóng lại sau 1 giây',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.deleteRoom(room);
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }

  deleteRoom(room:any){
    let obs = this.roomsService.deleteRoom(room.id).subscribe({
      next: (res) => {
        this.message.create(SUCCESS, "Xóa thành công !!");
        this.getRooms();
      },
      error: (err) => {
        this.message.create(ERROR, `${err.error.message}`)
        this.message.create(ERROR, `${err.message}`)
      }
    })
    this.subscription.add(obs);
  }

  cancel(event: any) {
    this.displayCreateUpdateRoom = false;
    this.getRooms();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

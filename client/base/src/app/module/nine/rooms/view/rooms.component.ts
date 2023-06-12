import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { NineStatus } from 'src/app/module/_mShared/enum/enum';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { Enum } from 'src/app/module/_mShared/service/enum.service';
import { RoomTypeService } from 'src/app/module/_mShared/service/room_type.service';
import { RoomsService } from 'src/app/module/_mShared/service/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  displayCreateUpdateRoom: boolean = false;

  constructor(
    private roomsService: RoomsService,
    private roomTypeService: RoomTypeService,
    ) {}

  rooms: any[] = [];
  menus: MenuItem[] = [];

  statusOption: any;
  room: any;

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
          console.log(3);
        },
      },
    ]
  }

  getRooms() {
    let obs = this.roomsService.getRooms().subscribe({
      next: (room) => {
        this.rooms = room;
        this.viewNameStatus(room);
        this.viewNameRoomType(room);
      },
      error: (err) => {
        alert(err);
      },
    });

    this.subscription.add(obs);
  }

  async viewNameStatus(rooms:any){
    for (const item of rooms) {
      this.statusOption.forEach((status:any) => {
        if(item.status == status.value){
          item.txtStatus = status.text;
        }
      });
    }
  }

  async viewNameRoomType(rooms:any){

    for (const item of rooms) {
      let roomTypes:any = await firstValueFrom(this.roomTypeService.getRoomType());
      for (const roomType of roomTypes) {
        if(roomType.id == item.room_type_id){
          item.txtRoomType = roomType.name;
        }
      }
    }
  }

  addRoom() {
    this.displayCreateUpdateRoom = true;
  }

  editRoom(room:any){
    this.displayCreateUpdateRoom = true;
    this.room = room;
  }

  cancel(event: any) {
    this.displayCreateUpdateRoom = false;
    this.getRooms();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

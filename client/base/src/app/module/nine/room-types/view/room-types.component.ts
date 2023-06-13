import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { RoomTypeService } from 'src/app/module/_mShared/service/room_type.service';

@Component({
  selector: 'app-room-types',
  templateUrl: './room-types.component.html',
  styleUrls: ['./room-types.component.scss']
})
export class RoomTypesComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  displayCreateUpdateRoomType: boolean = false;

  constructor(
    private roomTypeService: RoomTypeService
  ) { }

  roomTypes:any[] = [];
  menus: MenuItem[] = [];

  roomType: any;

  ngOnInit() {
    this.getRoomTypes();
  }

  dropdownItemsButton(data:any){
    this.menus = [
      {
        label: "Chỉnh sửa",
        command: () => {
          this.editRoomType(data);
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

  getRoomTypes(){
    let obs = this.roomTypeService.getRoomType().subscribe((res) => {
      this.roomTypes = res;
    })
    this.subscription.add(obs);
  }

  addRoomType(){
    this.displayCreateUpdateRoomType = true;
  }

  editRoomType(roomType:any){
    this.displayCreateUpdateRoomType = true;
    this.roomType = roomType;
    console.log(this.roomType)

  }

  cancel(event:any){
    this.displayCreateUpdateRoomType = false;
    this.getRoomTypes();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

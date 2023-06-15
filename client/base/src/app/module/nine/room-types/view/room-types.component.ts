import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
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
    private roomTypeService: RoomTypeService,
    private message: NzMessageService
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
    let obs = this.roomTypeService.getRoomTypes().subscribe({
      next: (res) => {
        this.roomTypes = res;
      },
      error: (err) => {
        this.message.create(ERROR, err.message)
      }
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
    alert("thành công !")
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

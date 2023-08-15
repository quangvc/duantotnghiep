import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { RoomTypeService } from 'src/app/module/_mShared/service/room_type.service';

@Component({
  selector: 'app-room-types',
  templateUrl: './room-types.component.html',
  styleUrls: ['./room-types.component.scss']
})
export class RoomTypesComponent implements OnInit, OnDestroy {

  @Input() idHotel: any;

  private subscription = new Subscription();

  displayCreateUpdateRoomType: boolean = false;

  constructor(
    private roomTypeService: RoomTypeService,
    private message: NzMessageService,
    private modal: NzModalService,
    private fb: FormBuilder
  ) { }

  confirmModal?: NzModalRef;

  formFilter!: FormGroup;

  roomTypes:RoomTypeModel[] = [];

  menus: MenuItem[] = [];

  roomTypeId: any;

  displayImage: boolean = false;

  displayRoom: boolean = false;

  room: any;

  hotel: any;

  roomType_name: any;

  ngOnInit() {
    this.createFormFilter();
    this.getRoomTypes();
  }

  private createFormFilter(){
    this.formFilter = this.fb.group({
      checkin: [],
      checkout: []
    })
  }

  dropdownItemsButton(data:any){
    this.menus = [
      {
        label: "Chỉnh sửa",
        command: () => {
          this.editRoomType(data);
        },
      },
      {
        label: "Phòng",
        command: () => {
          this.showRoom(data);
        },
      },
      {
        label: "Cài đặt hình ảnh",
        command: () => {
          this.showSettingImage(data);
        },
      },
      // { separator: true},
      // {
      //   label: "Xóa",
      //   command: () => {
      //     this.confirmDelete(data);
      //   },
      // },
    ]
  }

  getRoomTypes(){
    let obs = this.roomTypeService.getRoomTypes().subscribe({
      next: (res) => {
        this.roomTypes = res.data;
        if(this.idHotel){
          this.roomTypes = this.roomTypes.filter(type => type.hotelId == this.idHotel);
        }
      },
      error: (err) => {
        this.message.create(ERROR, `${err.error.message}`)
        this.message.create(ERROR, `${err.message}`)
      }
    })
    this.subscription.add(obs);
  }

  addRoomType(){
    this.displayCreateUpdateRoomType = true;
    this.roomTypeId = null;
  }

  showSettingImage(data:any){
    this.displayImage = true;
    this.roomTypeId = data.id
  }

  editRoomType(roomType:any){
    this.displayCreateUpdateRoomType = true;
    this.roomTypeId = roomType.id;
  }

  confirmDelete(roomType:any){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Bạn có muốn xóa ${roomType.name} ?`,
      nzContent: 'Khi bạn bấm nút OK, cửa sổ sẽ đóng lại sau 1 giây',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.deleteRoomType(roomType);
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }).catch()
    });
  }

  deleteRoomType(roomType:any){
    let obs = this.roomTypeService.deleteRoomType(roomType.id).subscribe({
      next: (res) => {
        this.message.create(SUCCESS, `Xóa ${roomType.name} thành công.`)
        this.getRoomTypes();
      },
      error: (err) => {
        this.message.create(ERROR, `${err.error.message}`)
        this.message.create(ERROR, `${err.message}`)
      }
    })

    this.subscription.add(obs);
  }

  kCheckin(event:any){


  }

  kCheckout(event:any){

  }

  submitCheck(){
    let id = this.idHotel;
    let checkin = this.formFilter.value.checkin;
    let checkout = this.formFilter.value.checkout;

    this.roomTypeService.filterRoomType(id,checkin,checkout).subscribe({
      next: (res) => {
        let newArray = [];
        for (const iterator of res) {
          let newRt:RoomTypeModel = {
            id: iterator.room_type.id,
            name: iterator.room_type.name,
            price_per_night: iterator.room_type.price_per_night,
            description: iterator.room_type.description,
            capacity: iterator.room_type.capacity,
            hotelId: iterator.room_type.hotel_id,
            created_at: iterator.room_type.created_at,
            updated_at: iterator.room_type.updated_at,
            quantity_room: iterator.rooms_count,
          }
          newArray.push(newRt);
        }
        this.roomTypes = newArray;
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })
  }

  showRoom(data:any){
    this.displayRoom = true;
    this.room = data.room;
    this.hotel = data.hotel;
    this.roomType_name = data.name;
  }

  cancel(event:any){
    this.displayCreateUpdateRoomType = false;
    this.displayImage = false;
    this.displayRoom = false;
    this.getRoomTypes();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

interface RoomTypeModel{
  id: any;
  name: string;
  price_per_night: number;
  description: string;
  capacity: number;
  hotelId: number;
  created_at: any;
  updated_at: any;
  quantity_room: number;
}

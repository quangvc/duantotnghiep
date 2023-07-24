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

  roomTypes:any[] = [];

  menus: MenuItem[] = [];

  roomTypeId: any;

  displayImage: boolean = false;

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
        label: "Cài đặt hình ảnh",
        command: () => {
          this.showSettingImage(data);
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

  getRoomTypes(){
    let obs = this.roomTypeService.getRoomTypes().subscribe({
      next: (res) => {
        this.roomTypes = res.data;
        if(this.idHotel){
          this.roomTypes = this.roomTypes.filter(type => type.hotelId == this.idHotel);
        }

        // for (const item of this.roomTypes) {
        //   // item.room_count = res.rooms_count;
        // }
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
        }).catch(() => console.log('Oops errors!'))
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
    console.log(event.target.value)

  }

  kCheckout(event:any){
    console.log(event.target.value)
  }

  submitCheck(){
    let id = this.idHotel;
    let checkin = this.formFilter.value.checkin;
    let checkout = this.formFilter.value.checkout;

    this.roomTypeService.filterRoomType(id,checkin,checkout).subscribe({
      next: (res) => {
        // this.roomTypes = res.room_type;
        console.log(res)
        // for (const item of this.roomTypes) {
        //   item.room_count = res.rooms_count;
        // }
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })
  }

  cancel(event:any){
    this.displayCreateUpdateRoomType = false;
    this.displayImage = false;
    this.getRoomTypes();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

// interface RoomTypeDto{

// }

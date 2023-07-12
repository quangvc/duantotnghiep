import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { RoomTypeService } from 'src/app/module/_mShared/service/room_type.service';
import { PhotoService } from 'src/app/services/photoservice.service';

interface Type {
  name: string;
  code: string;
}

@Component({
  selector: 'app-hotel-booking-room',
  templateUrl: './hotel-booking-room.component.html',
  styleUrls: ['./hotel-booking-room.component.scss'],
  providers: [PhotoService]
})
export class HotelBookingRoomComponent implements OnInit, OnDestroy {
  constructor(private photoService: PhotoService, private roomTypeService: RoomTypeService,) { }
  @Input() roomTypeId: any;
  private subscription = new Subscription();

  ref: DynamicDialogRef | undefined;
  displayRoomType: boolean = false;
  images: any[];

  selectedType!: Type;
  types: Type[] = [];
  checked: boolean = false;
  roomTypes: any[] = [];
  menus: MenuItem[] = [];
  roomType: any;

  // showDialog() {
  //     this.visible = true;
  // }

  ngOnInit() {
    this.types = [
      { name: 'Thành tiền', code: '1' },
      { name: '1 Đêm', code: '2' }
    ];
    this.photoService.getImages().then((images) => {
      this.images = images;
    });
    this.getRoomTypes();
  }

  getRoomTypes() {
    let obs = this.roomTypeService.getRoomTypes().subscribe({
      next: (res) => {
        this.roomTypes = res.data;
        // this.showRoomType(res.data);
      },
      error: (err) => {
        console.log('Đã xảy ra lỗi khi gọi API:', err);
      }
    })
    this.subscription.add(obs);
  }

  showRoomType(roomTypeId: any) {
    console.log(roomTypeId);
    if (roomTypeId) {
      this.displayRoomType = true;
      this.roomTypeId = roomTypeId;
    }

  }

  cancel(event: any) {
    debugger
    this.displayRoomType = false;
    this.getRoomTypes();
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}

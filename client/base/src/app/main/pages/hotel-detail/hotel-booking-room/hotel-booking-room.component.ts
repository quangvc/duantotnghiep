import { PhotoService } from './../../../services/photoservice.service';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ImagesClientService } from 'src/app/main/services/images-client.service';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { RoomTypeService } from 'src/app/module/_mShared/service/room_type.service';

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
  constructor(
    // private PhotoService: PhotoService,
    private ImagesClientService: ImagesClientService
  ) { }
  @Input() roomTypeId: any;
  @Input('hotelRoomTypeData') RoomTypeData: any[] = [];
  private subscription = new Subscription();

  ref: DynamicDialogRef | undefined;
  displayRoomType: boolean = false;
  images: any[];
  rangeDates: Date[] | undefined;

  selectedType!: Type;
  types: Type[] = [];
  checked: boolean = false;
  roomTypes: any[] = [];
  menus: MenuItem[] = [];
  roomType: any;

  ReadMore:boolean = true

  //hiding info box
  visible:boolean = false




  ngOnInit() {
    this.types = [
      { name: 'Thành tiền', code: '1' },
      { name: '1 Đêm', code: '2' }
    ];
    this.getRoomTypeImg()
  }

  getRoomTypeImg() {
    this.ImagesClientService.getImagesRoomType(this.roomTypeId).subscribe({

      next: (res) => {
        this.images = res.data;

      },
      error: (err) => {{
        console.log('Đã xảy ra lỗi khi gọi API:', err);
      }}
    });
  }


  //onclick toggling both
  onclick()
  {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible
  }


  // getRoomTypes() {
  //   let obs = this.roomTypeService.getRoomTypes().subscribe({
  //     next: (res) => {
  //       this.roomTypes = res.data;
  //       // this.showRoomType(res.data);
  //     },
  //     error: (err) => {
  //       console.log('Đã xảy ra lỗi khi gọi API:', err);
  //     }
  //   })
  //   this.subscription.add(obs);
  // }

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
    // this.getRoomTypes();
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}

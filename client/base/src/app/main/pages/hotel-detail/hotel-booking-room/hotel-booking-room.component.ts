import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { PhotoService } from './../../../services/photoservice.service';
import { RoomTypeDetailComponent } from './room-type-detail/room-type-detail.component';

interface Type {
  name: string;
  code: string;
}

interface Room {
  name: string;
  price: number;
}

interface roomType {
  hotel_id: number;
  name: string;
  price_per_night: number;
  capacity: number;
  description: string;
  selectedRoom: Room | null;
}

@Component({
  selector: 'app-hotel-booking-room',
  templateUrl: './hotel-booking-room.component.html',
  styleUrls: ['./hotel-booking-room.component.scss'],
  providers: [PhotoService]
})
export class HotelBookingRoomComponent implements OnInit {
  @Input('hotelRoomTypeData') RoomTypeData: any[] = [];
  @ViewChild('dialog') dialog: RoomTypeDetailComponent;
  rangeDates: Date[] | undefined;

  roomType: any;
  selectedType!: Type;
  selectedImage: string;
  //hiding info box
  visible: boolean = false
  ReadMore: boolean = true
  checked: boolean = false;
  displayRoomType: boolean = false;
  selectedRoomType!: roomType;
  types: Type[] = [];
  menus: MenuItem[] = [];
  roomTypeDisplay: boolean[] = [];
  roomTypes: roomType[];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(
  ) {
  }
  ngOnInit() {
    this.types = [
      { name: 'Thành tiền', code: '1' },
      { name: '1 Đêm', code: '2' }
    ];

  }

  //onclick toggling both
  onclick() {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible
  }

  openDialog(roomType: any) {
    this.dialog.open(roomType);
  }


  // Table
  getCapacitysArray(capacityCount: any): number[] {
    return Array(capacityCount);
  }
  calculateRowTotal(room: roomType): number {
    if (room.selectedRoom) {
      return room.selectedRoom.price;
    } else {
      return 0;
    }
  }
  calculateTotal(): number {
    let total = 0;
    for (let room of this.roomTypes) {
      if (room.selectedRoom) {
        total += room.selectedRoom.price;
      }
    }
    return total;
  }
  onRowSelect(event: any) {
    // Lấy dữ liệu của hàng được chọn
    const selectedRowData = event.data;
    console.log(selectedRowData); // In ra dữ liệu của hàng được chọn
  }

}

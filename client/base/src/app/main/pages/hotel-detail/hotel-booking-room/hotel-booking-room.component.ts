import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { PhotoService } from '../../../services/photoservice.service';
import { RoomTypeDetailComponent } from './room-type-detail/room-type-detail.component';
import { roomTypeClientService } from 'src/app/main/services/room-type-client.service';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { Subscription } from 'rxjs';

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
  constructor(
    private roomTypeClientService: roomTypeClientService,
    private message: NzMessageService,
  ) { }
  private subscription = new Subscription();

  @Input('hotelRoomTypeData') RoomTypeData: any[] = [];
  @Input() hotel_id: any;
  @Input() hotel_name: any;
  @ViewChild('dialog') dialog: RoomTypeDetailComponent;
  rangeDates: Date[] = [];

  firstTable: boolean = true;
  dataTable: boolean = false;

  roomType: any;
  selectedType!: Type;
  selectedImage: string;
  hotelId: any;
  date_in: string = ''; // Ngày check-in
  date_out: string = ''; // Ngày check-out
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

  ngOnInit() {
    this.types = [
      { name: 'Thành tiền', code: '1' },
      { name: '1 Đêm', code: '2' }
    ];
    console.log(this.RoomTypeData);

  }

  //onclick toggling both
  onclick() {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible
  }

  openDialog(roomType: any) {
    this.dialog.open(roomType);
  }

  getRoomType() {
    // Gán giá trị date_in và date_out dựa trên rangeDates
    this.date_in = moment(this.rangeDates[0])?.format('DD-MM-YYYY') || '';
    this.date_out = moment(this.rangeDates[this.rangeDates.length - 1])?.format('DD-MM-YYYY') || '';
    const obs = this.roomTypeClientService.findRoomType(this.hotel_id, this.date_in, this.date_out).subscribe({
      next: (res) => {
        console.log(res);
        this.roomTypes = res;
        this.firstTable = false;
        this.dataTable = true

        // this.getImage();
      },
      error: (err) => {
        this.message.create(ERROR, err.message);
      }
    });

    this.subscription.add(obs);
  }


  // Table
  getCapacitysArray(capacityCount: any): number[] {
    return Array(capacityCount);
  }

  getRoomsArray(RoomCount: any): number[] {
    return Array(RoomCount);
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
    this.selectedRoomType = event.data;
    console.log(this.selectedRoomType); // Dữ liệu của dòng được chọn
  }

}

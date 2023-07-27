import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { BookingClientService } from 'src/app/main/services/bookingClient.service';
import { RoomClientService } from 'src/app/main/services/room-client.service';
import { roomTypeClientService } from 'src/app/main/services/room-type-client.service';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { BookingsService } from 'src/app/module/_mShared/service/bookings.service';
interface Hotel {
  id: number;
  hotel_name: string;
}

interface RoomType {
  id: number;
  hotel_id: number;
  name: string;
  hotel: Hotel;
}

interface BookingDetail {
  id: number;
  booking_id: number;
  room_type_id: number;
  room_id: number | null;
  room_type: RoomType;
  count?: number;
}
@Component({
  selector: 'payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent implements OnInit {

  @Input() bookingId: any;
  @Input() displayBookingForm: boolean;
  @Output() closeModal = new EventEmitter<any>();

  constructor(
    private bookingsService: BookingClientService,
    // private bookingsService: BookingsService,
    private modal: NzModalService,
    private message: NzMessageService,
    private roomService: RoomClientService
  ) { }


  confirmModal?: NzModalRef;


  booking: any[] = [];
  booking_details: BookingDetail[] = [];
  rooms: any[] = [];

  ngOnInit() {
    this.getDetail();
    this.getRooms();
  }

  getDetail(){
    this.bookingsService.findOne(this.bookingId).subscribe({
      next: (res) => {
        console.log(res);

        this.booking = res.data;
        this.booking_details = this.booking[0].booking_details;
        console.log(this.booking_details )
        this.processBookingDetails();
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
        this.message.create(ERROR, err.message);
      }
    })
  }

  processBookingDetails() {
    const mergedBookingDetails: BookingDetail[] = this.booking_details.reduce((acc, cur) => {
      const existingEntry = acc.find((entry) => entry.room_type_id === cur.room_type_id);
      if (existingEntry) {
        existingEntry.count! += 1;
      } else {
        acc.push({ ...cur, count: 1 });
      }
      return acc;
    }, [] as BookingDetail[]);

    this.booking_details = mergedBookingDetails;
  }

  getRooms(){
    this.roomService.getRooms().subscribe({
      next: (res) => {
        console.log(res);
        this.rooms = res.data;
      }
    })
  }

  // asignRoom(event:any,data:any){
  //   console.log(event.target.value);
  //   if(event){

  //   }
  //   console.log(data);
  // }

  handleCancel(){
    this.closeModal.emit();
  }

}

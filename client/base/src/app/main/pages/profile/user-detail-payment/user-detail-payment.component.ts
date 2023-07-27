import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { RoomClientService } from 'src/app/main/services/room-client.service';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { BookingsService } from 'src/app/module/_mShared/service/bookings.service';

@Component({
  selector: 'user-detail-payment',
  templateUrl: './user-detail-payment.component.html',
  styleUrls: ['./user-detail-payment.component.scss']
})
export class UserDetailPaymentComponent implements OnInit {

  @Input() bookingId: any;
  @Input() displayBookingForm: boolean;
  @Output() closeModal = new EventEmitter<any>();

  constructor(
    // private bookingsService: BookingClientService,
    private bookingsService: BookingsService,
    private modal: NzModalService,
    private message: NzMessageService,
    private roomService: RoomClientService
  ) { }


  confirmModal?: NzModalRef;


  booking: any[] = [];
  booking_details: any[] = [];

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
        // this.booking_details = this.booking[0].booking_details;
        // console.log(this.booking_details )
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
        this.message.create(ERROR, err.message);
      }
    })
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

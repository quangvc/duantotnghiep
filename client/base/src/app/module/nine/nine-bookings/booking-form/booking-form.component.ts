import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { BookingsService } from 'src/app/module/_mShared/service/bookings.service';
import { RoomsService } from 'src/app/module/_mShared/service/rooms.service';

@Component({
  selector: 'booking-form',
  templateUrl: './booking-form.component.html'
})
export class BookingFormComponent implements OnInit {

  @Input() bookingId: any;
  @Input() displayBookingForm: boolean;
  @Output() closeModal = new EventEmitter<any>();

  constructor(
    private bookingsService: BookingsService,
    private modal: NzModalService,
    private message: NzMessageService,
    private roomService: RoomsService
  ) { }


  confirmModal?: NzModalRef;


  booking: any[] = [];
  booking_details: any[] = [];

  rooms: any[] = [];

  displayXepPhong: boolean = false;
  room: any;

  ngOnInit() {
    this.getDetail();
    this.getRooms();
  }

  getDetail(){
    this.bookingsService.findOne(this.bookingId).subscribe({
      next: (res) => {
        this.booking = res.data;
        this.booking_details = this.booking[0].booking_details;
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
        this.rooms = res.data;
      }
    })
  }

  handleOk(){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Xác nhận thay đổi?`,
      nzContent: 'Bạn có muốn lưu thay đổi không?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.closeModal.emit();
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }).catch()
    });
  }

  refuseCancel(){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Xác nhận thay đổi?`,
      nzContent: 'Bạn có muốn hủy đơn hàng này?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.closeModal.emit();
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }).catch()
    });
  }

  asignRoom(event:any){
    console.log(event.target.value);

      let mang = [];

      for (const room of this.rooms) {

        // if(event.target.value == 0){
        //   room.isActive = false;
        // }else{
        //
        //   }
        // }
        if(event.target.value == room.id){
            room.isActive = true;
            mang.push(room)
        }

      }
      console.log(mang);
      console.log(this.rooms.filter(x => x.room_type.id == 8));
  }

  // roomList(data:any){
  //   this.displayXepPhong = true;
  //   this.room = data;
  // }

  cancelModal(event: any){
    this.displayXepPhong = false;
  }

  handleCancel(){
    this.closeModal.emit();
  }

}

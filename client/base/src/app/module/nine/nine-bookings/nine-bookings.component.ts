import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { BookingsService } from '../../_mShared/service/bookings.service';
import { Enum } from '../../_mShared/service/static/enum.service';
import { StatusBookings } from '../../_mShared/enum/enum';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR } from '../../_mShared/model/url.class';

@Component({
  selector: 'app-nine-bookings',
  templateUrl: './nine-bookings.component.html',
  styleUrls: ['./nine-bookings.component.scss']
})
export class NineBookingsComponent implements OnInit {

  constructor(
    private bookingService: BookingsService,
    private message: NzMessageService,
  ) { }

  displayBookingForm: boolean = false;
  displayCreateBooking: boolean = false;

  bookings: any[] = [];

  bookingFilters: any[] = [...this.bookings]

  role:any;

  tabs = [1, 2, 3];

  statusOptions: any[] = [{text: "Tất cả", value: -1}];

  bookingId: any;

  ngOnInit() {
    this.checkRole();
    this.getBookings();
    this.getOption();
  }

  checkRole(){
    switch (Auth.User('role')) {
      case 'admin':
        return this.role = true;
        break;
      case 'manager':
        return this.role = true;
        break;
      default:
        return this.role = false;
        break;
    }
  }

  getOption(){
    this.statusOptions.push(...Enum.convertEnum(StatusBookings));
  }

  convertTextStatus(){
    for (const booking of this.bookingFilters) {
      if(booking.status == StatusBookings.Unpaid){
        booking.txtStatus = "Chưa thanh toán"
      }
      if(booking.status == StatusBookings.Unconfirmed){
        booking.txtStatus = "Đang chờ duyệt"
      }
      if(booking.status == StatusBookings.Confirmed){
        booking.txtStatus = "Đã duyệt"
      }
      if(booking.status == StatusBookings.Using){
        booking.txtStatus = "Đang sử dụng"
      }
      if(booking.status == StatusBookings.Clean){
        booking.txtStatus = "Đang dọn dẹp"
      }
      if(booking.status == StatusBookings.Cancel){
        booking.txtStatus = "Đã hủy"
      }
    }
  }

  getBookings(){
    let obs = this.bookingService.getBookings().subscribe({
      next: (res) => {
        this.bookingFilters = res.data;
        console.log(this.bookingFilters)

        this.convertTextStatus();

        for (const statusOption of this.statusOptions) {
          if(statusOption.value == -1){
            statusOption.text = "Tất cả"
          }
          if(statusOption.value == StatusBookings.Unpaid){
            statusOption.text = "Chưa thanh toán"
          }
          if(statusOption.value == StatusBookings.Unconfirmed){
            statusOption.text = "Đang chờ duyệt"
          }
          if(statusOption.value == StatusBookings.Confirmed){
            statusOption.text = "Đã duyệt"
          }
          if(statusOption.value == StatusBookings.Using){
            statusOption.text = "Đang sử dụng"
          }
          if(statusOption.value == StatusBookings.Clean){
            statusOption.text = "Đang dọn dẹp"
          }
          if(statusOption.value == StatusBookings.Cancel){
            statusOption.text = "Đã hủy"
          }
          if(statusOption.value == StatusBookings.WaitingCancel){
            statusOption.text = "Đang chờ hủy"
          }
        }

      },
      error: (err) => {
        this.message.create(ERROR, `${err.error.message}`)
        this.message.create(ERROR, `${err.message}`)
      }
    })
  }

  valueFilter(value:any){
    let obs = this.bookingService.getBookings().subscribe((res) => {
      let bookings:any[] = res.data;
      console.log(value)
      let status:number = 0;

      if(value == StatusBookings.Unconfirmed){
        status = StatusBookings.Unconfirmed;
      }
      if(value == StatusBookings.Confirmed){
        status = StatusBookings.Confirmed;
      }
      if(value == StatusBookings.Using){
        status = StatusBookings.Using;
      }
      if(value == StatusBookings.Clean){
        status = StatusBookings.Clean;
      }
      if(value == StatusBookings.Cancel){
        status = StatusBookings.Cancel;
      }

      if(value == StatusBookings.WaitingCancel){
        status = StatusBookings.WaitingCancel;
      }

      this.bookingFilters = bookings.filter(bk => bk.status == status);

      if(value == -1){
        this.bookingFilters = bookings.filter(bk => bk);
      }

      this.convertTextStatus();
    })

  }

  updateStatus(value:any){
    this.displayBookingForm = true;
    this.bookingId = value;
  }

  eventSubmit(event:any){
    this.displayBookingForm = false;
    this.getBookings();
  }

  createBooking(){
    this.displayCreateBooking = true;
  }

  emitEvent(event:any){
    this.displayCreateBooking = false;
    this.getBookings();
  }
}

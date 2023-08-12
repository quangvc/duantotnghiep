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

  dataDetail:any;

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
        booking.txtStatus = "Đã thanh toán"
      }
      if(booking.status == StatusBookings.Confirmed){
        booking.txtStatus = "Check in"
      }
      if(booking.status == StatusBookings.Using){
        booking.txtStatus = "Check out"
      }
      if(booking.status == StatusBookings.Cancel){
        booking.txtStatus = "Đã hủy"
      }
      if(booking.status == StatusBookings.WaitingCancel){
        booking.txtStatus = "Đang chờ hủy"
      }
    }
  }

  getBookings(){
    let obs = this.bookingService.getBookings().subscribe({
      next: (res) => {
        this.bookingFilters = res.data;
        console.log(res)

        this.convertTextStatus();

        for (const statusOption of this.statusOptions) {
          if(statusOption.value == -1){
            statusOption.text = "Tất cả"
          }
          if(statusOption.value == StatusBookings.Unpaid){
            statusOption.text = "Chưa thanh toán"
          }
          if(statusOption.value == StatusBookings.Unconfirmed){
            statusOption.text = "Đã thanh toán"
          }
          if(statusOption.value == StatusBookings.Confirmed){
            statusOption.text = "Check in"
          }
          if(statusOption.value == StatusBookings.Using){
            statusOption.text = "Check out"
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
      if(value == StatusBookings.Cancel){
        status = StatusBookings.Cancel;
      }

      if(value == StatusBookings.WaitingCancel){
        status = StatusBookings.WaitingCancel;
      }

      this.bookingFilters = bookings.filter(bk => bk.status == status);

      if(value == -1){
        this.bookingFilters = bookings.filter(bk => bk);
        console.log(this.bookingFilters)
      }

      this.convertTextStatus();
    })

  }

  updateStatus(value:any,data:any){
    this.displayBookingForm = true;
    this.bookingId = value;
    this.dataDetail = data;
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

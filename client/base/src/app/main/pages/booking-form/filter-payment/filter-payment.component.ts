import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { BookingClientService } from 'src/app/main/services/bookingClient.service';
import { StatusBookings } from 'src/app/module/_mShared/enum/enum';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { Enum } from 'src/app/module/_mShared/service/static/enum.service';
import { StatusHelper } from 'src/shared/helpers/BookingHelper';

@Component({
  selector: 'app-filter-payment',
  templateUrl: './filter-payment.component.html',
  styleUrls: ['./filter-payment.component.scss']
})
export class FilterPaymentComponent implements OnInit {

  constructor(
    private bookingService: BookingClientService,
    private message: NzMessageService,
    private primengConfig: PrimeNGConfig,
  ) { }
  searchCode: string;
  showTable: boolean = false;
  data: any[];
  bookingDate: any;
  statusText: any;
  cols: any[] = [];
  loading: boolean;
  displayBookingForm: boolean = false;
  displayCreateBooking: boolean = false;

  bookings: any[] = [];

  bookingFilters: any[] = [...this.bookings]

  role:any;

  tabs = [1, 2, 3];

  statusOptions: any[] = [{text: "Tất cả", value: 0}];

  bookingId: any;

  ngOnInit() {
    this.getOption();
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
      if(booking.status == StatusBookings.WaitingCancel){
        booking.txtStatus = "Đang chờ hủy"
      }
    }
  }

  onSearch() {
    console.log(this.searchCode);
    let obs = this.bookingService.findByCode(this.searchCode).subscribe({
      next: (res) => {
        this.bookingFilters = res.data;
        console.log(this.bookingFilters)
        this.showTable = true;
        this.bookingDate = moment(res.data[0].booking_date).format('DD-MM-YYYY');
        this.convertTextStatus();

      },
      error: (err) => {
        this.showTable = true;
        this.data = [];
        this.message.create(ERROR, `${err.error.message}`)
        this.message.create(ERROR, `${err.message}`)
      }
    })
  }

  eventSubmit(event:any){
    this.displayBookingForm = false;
    // this.getBookings();
  }

  emitEvent(event:any){
    this.displayCreateBooking = false;
    // this.getBookings();
  }
  updateStatus(value:any){
    this.displayBookingForm = true;
    this.bookingId = value;
  }
}

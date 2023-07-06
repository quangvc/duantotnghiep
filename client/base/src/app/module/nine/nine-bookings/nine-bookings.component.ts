import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { BookingsService } from '../../_mShared/service/bookings.service';
import { Enum } from '../../_mShared/service/static/enum.service';
import { StatusBookings } from '../../_mShared/enum/enum';

@Component({
  selector: 'app-nine-bookings',
  templateUrl: './nine-bookings.component.html',
  styleUrls: ['./nine-bookings.component.scss']
})
export class NineBookingsComponent implements OnInit {

  constructor(
    private bookingService: BookingsService
  ) { }

  bookings: any[] = [];

  bookingFilters: any[] = [...this.bookings]

  role:any;

  tabs = [1, 2, 3];

  statusOptions: any[] = [{text: "Tất cả", value: ""}];

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
      default:
        return this.role = false;
        break;
    }
  }

  getOption(){
    this.statusOptions.push(...Enum.convertEnum(StatusBookings));
  }

  getBookings(){
    let obs = this.bookingService.getBookings().subscribe({
      next: (res) => {
        this.bookings = res.data;

        for (const statusOption of this.statusOptions) {
          if(statusOption.value == ""){
            this.bookingFilters = res.data;
          }
          if(statusOption.value == StatusBookings.Unconfirmed){
            statusOption.text = "Đang chờ duyệt"
            this.bookingFilters =  this.bookings.filter(bk => bk.status == StatusBookings.Unconfirmed);
          }
          if(statusOption.value == StatusBookings.Confirmed){
            statusOption.text = "Đã duyệt"
            this.bookingFilters =  this.bookings.filter(bk => bk.status == StatusBookings.Confirmed);
          }
          if(statusOption.value == StatusBookings.Using){
            statusOption.text = "Đang sử dụng"
            this.bookingFilters =  this.bookings.filter(bk => bk.status == StatusBookings.Using);
          }
          if(statusOption.value == StatusBookings.Clean){
            statusOption.text = "Đang dọn dẹp"
            this.bookingFilters =  this.bookings.filter(bk => bk.status == StatusBookings.Clean);
          }
          if(statusOption.value == StatusBookings.Cancel){
            statusOption.text = "Đã hủy"
            this.bookingFilters =  this.bookings.filter(bk => bk.status == StatusBookings.Cancel);
          }
        }

      },
      error: (err) => {}
    })
  }

  valueFilter(value:any){
    if(value.value == ""){
      this.bookingFilters = this.bookings;
    }
    if(value.value == StatusBookings.Unconfirmed){
      this.bookingFilters =  this.bookings.filter(bk => bk.status == StatusBookings.Unconfirmed);
    }
    if(value.value == StatusBookings.Confirmed){
      this.bookingFilters =  this.bookings.filter(bk => bk.status == StatusBookings.Confirmed);
    }
    if(value.value == StatusBookings.Using){
      this.bookingFilters =  this.bookings.filter(bk => bk.status == StatusBookings.Using);
    }
    if(value.value == StatusBookings.Clean){
      this.bookingFilters =  this.bookings.filter(bk => bk.status == StatusBookings.Clean);
    }
    if(value.value == StatusBookings.Cancel){
      this.bookingFilters =  this.bookings.filter(bk => bk.status == StatusBookings.Cancel);
    }
  }

}

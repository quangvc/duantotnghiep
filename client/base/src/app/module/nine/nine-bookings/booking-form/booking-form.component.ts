import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookingsService } from 'src/app/module/_mShared/service/bookings.service';

@Component({
  selector: 'booking-form',
  templateUrl: './booking-form.component.html'
})
export class BookingFormComponent implements OnInit {

  @Input() bookingId: any;
  @Input() displayBookingForm: boolean;
  @Output() closeModal = new EventEmitter<any>();

  constructor(
    private bookingsService: BookingsService
  ) { }

  booking: any[] = []

  ngOnInit() {
    this.getDetail();
  }

  getDetail(){
    this.bookingsService.findOne(this.bookingId).subscribe({
      next: (res) => {
        this.booking = res.data;
        console.log(this.booking)
      }
    })
  }

  handleOk(){

  }

  handleCancel(){
    this.closeModal.emit();
  }

}

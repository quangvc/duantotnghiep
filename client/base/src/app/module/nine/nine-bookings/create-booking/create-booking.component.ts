import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent implements OnInit {

  @Input() displayCreateBooking: boolean;
  @Output() closeModal = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  handleOk(){

  }
  handleCancel(){
    this.closeModal.emit();
  }
}

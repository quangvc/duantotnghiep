import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'detail-hotel',
  templateUrl: './detail-hotel.component.html',
  styleUrls: ['./detail-hotel.component.scss']
})
export class DetailHotelComponent implements OnInit {

  @Input() hotelId: any;
  @Input() displayDetail: boolean;
  @Input() roomTypes: any[]=[];
  @Input() hotel_name: any;
  @Output() closeModal = new EventEmitter<any>();

  constructor() { }

  idHotel: any;

  ngOnInit() {
    this.idHotel = this.hotelId;
  }

  handleCancel(){
    this.closeModal.emit();
  }

}

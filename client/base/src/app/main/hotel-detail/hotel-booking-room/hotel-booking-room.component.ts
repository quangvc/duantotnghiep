import { Component, OnInit } from '@angular/core';

interface Type {
  name: string;
  code: string;
}

@Component({
  selector: 'app-hotel-booking-room',
  templateUrl: './hotel-booking-room.component.html',
  styleUrls: ['./hotel-booking-room.component.scss']
})
export class HotelBookingRoomComponent implements OnInit {

  selectedType!: Type;
  types: Type[] = [];
  checked: boolean = false;


  ngOnInit() {
    this.types = [
      { name: 'Thành tiền', code: '1' },
      { name: '1 Đêm', code: '2' }
    ];
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hotel-detail-amenities',
  templateUrl: './hotel-detail-amenities.component.html',
  styleUrls: ['./hotel-detail-amenities.component.scss']
})
export class HotelDetailAmenitiesComponent {
  @Input() hotel_name: any;
}

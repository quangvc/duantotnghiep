import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hotel-policy',
  templateUrl: './hotel-policy.component.html',
  styleUrls: ['./hotel-policy.component.scss']
})
export class HotelPolicyComponent {
  @Input() hotel_name: any;
}

import { PhotoService } from './../../../services/photoservice.service';
import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  @Output() valueChange = new EventEmitter<any>();
  static HotelBookingRoomComponent: any[] | Type<any>;

  constructor(private photoService: PhotoService) { }
  @Input() value : any[] = [];
  images: any[] = [];

  position: string = 'bottom';

  positionOptions = [
    {
      label: 'Bottom',
      value: 'bottom'
    },
    {
      label: 'Top',
      value: 'top'
    },
    {
      label: 'Left',
      value: 'left'
    },
    {
      label: 'Right',
      value: 'right'
    }
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  ngOnInit() {
    this.photoService.getImages().then((images) => (this.images = images));

  }


}

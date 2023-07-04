import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from 'src/app/services/photoservice.service';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss'],
  providers: [PhotoService]
})
export class HotelDetailComponent implements OnInit {
  @Output() valueChange = new EventEmitter<any>();
  static HotelBookingRoomComponent: any[] | Type<any>;

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private hotelsService: HotelsService,
  ) { }
  @Input() value: any[] = [];
  images: any[] = [];
  hotel: any;

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
    this.route.params.subscribe(params => {
      const id = params['id']; // Lấy giá trị ID từ URL
      this.hotelsService.findOne(id).subscribe({

        next: (res) => {
          this.hotel = res.data;
        },
        error: (err) => {{
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }}
      });
    });
  }


}

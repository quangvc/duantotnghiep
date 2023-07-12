import { PhotoService } from './../../services/photoservice.service';
import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
import { HotelClientService } from '../../services/hotelClient.service';
import { ImagesService } from 'src/app/module/_mShared/service/images.service';
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
    private imageService: ImagesService,
    private route: ActivatedRoute,
    private HotelClientService: HotelClientService,

  ) { }
  @Input() value: any[] = [];
  images: any[] = [];

  hotels: any[] = [];
  hotel: any;
  hotel_id: any;

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

    // this.PhotoService.getImages().then((images) => (this.images = images));
    this.route.params.subscribe(params => {
      const id = params['id']; // Lấy giá trị ID từ URL
      this.HotelClientService.findOne(id).subscribe({

        next: (res) => {
          this.hotels = res.data;
          this.hotel_id = res.data[0].id;
          console.log(this.hotel_id);

        },
        error: (err) => {{
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }}
      });
    });
    this.getImages();
  }
  getImages(){
    this.imageService.getImages().subscribe({
      next: (res) => {
        this.images = res;
        this.images = this.images.filter(img => img.hotel_id == this.hotel_id);
        console.log(this.images)
      },
      error: (err) => {{
        console.log('Đã xảy ra lỗi khi gọi API:', err);
      }}
    })
  }

}

import { PhotoService } from '../../services/photoservice.service';
import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
import { HotelClientService } from '../../services/hotelClient.service';
import { ImagesService } from 'src/app/module/_mShared/service/images.service';
import { ImagesClientService } from '../../services/images-client.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FeedbackClientService } from '../../services/feedback-client.service';
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
    private ImagesClientService: ImagesClientService,
    private route: ActivatedRoute,
    private HotelClientService: HotelClientService,
    private FeedbackClientService: FeedbackClientService,
  ) { }
  @Input() value: any[] = [];
  images: any[] = [];

  hotels: any[] = [];
  hotelRoomTypeData: any[] = [];
  hotel: any;
  hotel_id: any;
  hotel_name: any;
  region_id: any;
  region_name: any;
  feedbacks: any[] = [];
  rating: any;

  minPrice: number;
  starRating: number;
  formStar!: FormGroup;

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
    this.formStar = new FormGroup({
      value: new FormControl(this.starRating)
    });
    // this.PhotoService.getImages().then((images) => (this.images = images));
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.HotelClientService.findOne(id).subscribe({
        next: (res) => {
          console.log(res);
          this.hotels = res.data;
          this.hotel_id = res.data[0].id;
          this.hotel_name = res.data[0].hotel_name;
          this.region_id = res.data[0].region.id;
          this.region_name = res.data[0].region.name;
          console.log(this.region_id);
          console.log(this.region_name);
          this.hotelRoomTypeData = res.data[0].room_type;
          let minNumber = Infinity;

          for (let i = 0; i < this.hotelRoomTypeData.length; i++) {
            if (this.hotelRoomTypeData[i].price_per_night < minNumber) {
              minNumber = this.hotelRoomTypeData[i].price_per_night;
              this.minPrice = minNumber;
            }
          }
          this.formStar.controls['value'].setValue(res.data[0].star_rating);
        },
        error: (err) => {{
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }}
      });

      this.FeedbackClientService.getFeedbackByHotel(id).subscribe({
        next: (res) => {
          console.log(res);
          this.feedbacks = res;
        },
        error: (err) => {{
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }}
      });
      this.FeedbackClientService.getHotelRating(id).subscribe({
        next: (res) => {
          console.log(res);
          this.rating = res;
        },
        error: (err) => {{
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }}
      });
    });
  }
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

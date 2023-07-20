import { Component, OnInit } from '@angular/core';
import { HotelClientService } from '../../services/hotelClient.service';
import { RegionsClientService } from '../../services/regions-client.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { Subscription } from 'rxjs';
import { BlogClientService } from '../../services/blogClient.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

interface Hotel {
  // ...
  starRating: number;
  // ...
}

@Component({
  selector: 'main-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private subscription = new Subscription();

  sessionUser:any = sessionStorage.getItem('user');
  user:any = JSON.parse(this.sessionUser);

  constructor(
    private HotelClientService: HotelClientService,
    private RegionsClientService: RegionsClientService,
    private message: NzMessageService,
    private BlogClientService: BlogClientService,
    ) { }

  hotels: any[] = [];
  hotelId: any;
  regions: any[] = [];
  lstRegions: any[] = [];
  selectedRegion: any;
  date_in: any;
  date_out: any;
  regionId: any;
  blogs: any[] = [];
  blogId: any;
  slug: any;
  images: any[] = [];
  ratings: number[] = []; // Biến trung gian để lưu trữ giá trị xếp hạng
  formStar!: FormGroup;
  statusOption: any;
  role:any;
  starRating: number = 0;


  displayImage: boolean = false;

  ngOnInit() {
    this.getRegions();
    this.getBlogs();
    this.getHotels();


  }

  getRegions(){
    let obs = this.RegionsClientService.getRegions().subscribe({
      next: (res) => {
        this.regions = res.data.slice(0, 3);
        this.lstRegions = res.data;
        // const limitedData = res.data.property.slice(0, 2);
        // this.regions = limitedData
        // this.getImage();
      },
      error: (err) => {{
        this.message.create(ERROR, err.message);
      }}
    })
    this.subscription.add(obs);
  }

  getHotels(){
    let obs = this.HotelClientService.getHotels().subscribe({
      next: (res) => {
        this.hotels = res.data.slice(0, 6);
        this.starRating = res.data.star_rating;
      },
      error: (err) => {{
        this.message.create(ERROR, err.message);
      }}
    })
    this.subscription.add(obs);
  }

  updateRating(hotel: any, event: any) {
    hotel.star_rating = event.value;
  }

  filterHotel() {
    if (this.selectedRegion && this.date_in && this.date_out) {
      this.date_in = moment(this.date_in)?.format('DD-MM-YYYY') || '';
      this.date_out = moment(this.date_out)?.format('DD-MM-YYYY') || '';
      this.selectedRegion = JSON.stringify(this.selectedRegion);
      // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
      const selectedRegionObject = JSON.parse(this.selectedRegion);

      // Truy cập vào thuộc tính id trong đối tượng
      console.log(selectedRegionObject.id);
      console.log(this.date_in);
      console.log(this.date_out);
      // Các giá trị cụ thể cho các tham số
      const regionId = selectedRegionObject.id;
      const checkinDate = this.date_in;
      const checkoutDate = this.date_out;

      // Xây dựng URL mới từ đoạn định dạng và các giá trị cụ thể
      const baseUrl = 'hotels/get/';
      const urlWithParams = `${baseUrl}${regionId}/${checkinDate}/${checkoutDate}`;

      // Chuyển hướng trình duyệt đến URL mới
      window.location.href = urlWithParams;

    }
  }

  getBlogs(){
    // let obs = this.BlogClientService.getBlogs().subscribe({
    let obs = this.BlogClientService.getBlogs().subscribe({
      next: (res) => {
        this.blogs = res.data;
      },
      error: (err) => {{
        this.message.create(ERROR, err.message);
      }}
    })
    this.subscription.add(obs);
  }
}

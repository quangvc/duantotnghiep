import { Component, OnInit } from '@angular/core';
import { HotelClientService } from '../../services/hotelClient.service';
import { RegionsClientService } from '../../services/regions-client.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { Subscription } from 'rxjs';
import { BlogClientService } from '../../services/blogClient.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

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
        console.log(res.data)
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
        console.log(res.data)
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



  getBlogs(){
    // let obs = this.BlogClientService.getBlogs().subscribe({
    let obs = this.BlogClientService.getBlogs().subscribe({
      next: (res) => {
        this.blogs = res.data;
        console.log(res)
      },
      error: (err) => {{
        this.message.create(ERROR, err.message);
      }}
    })
    this.subscription.add(obs);
  }
}

import { Component, OnInit } from '@angular/core';
import { HotelClientService } from '../../services/hotelClient.service';
import { RegionsClientService } from '../../services/regions-client.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { Subscription } from 'rxjs';
import { BlogClientService } from '../../services/blogClient.service';

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
    // private HotelClientService: HotelClientService,
    private RegionsClientService: RegionsClientService,
    private message: NzMessageService,
    private BlogClientService: BlogClientService,
    ) { }

  hotels: any[] = [];
  hotelId: any;
  regions: any[] = [];
  regionId: any;
  blogs: any[] = [];
  blogId: any;
  slug: any;

  statusOption: any;
  role:any;

  displayImage: boolean = false;

  ngOnInit() {
    this.getRegions();
    this.getBlogs();
  }

  getRegions(){
    let obs = this.RegionsClientService.getRegions().subscribe({
      next: (res) => {
        console.log(res.data)
        this.regions = res.data.slice(2);
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

import { Component, OnInit } from '@angular/core';
import { HotelClientService } from '../../services/hotelClient.service';
import { RegionsClientService } from '../../services/regions-client.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { Subscription } from 'rxjs';

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
    ) { }

  hotels: any[] = [];
  hotelId: any;
  regions: any[] = [];
  regionId: any;

  statusOption: any;
  role:any;

  displayImage: boolean = false;

  ngOnInit() {
    this.getRegions();
    // if(this.user.role[0] == 'admin'){
    //   this.role = true;
    // }else{
    //   this.role = false;
    // }
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

  // async getImage(){
  //   let images:any[] = await firstValueFrom(this.imagesService.getImages());

  //   for (const item of this.hotels) {
  //     images.forEach(img => {
  //       if(img.hotel_id == item.id){
  //         item.image = `${URL_IMAGE}/${img.path}`;
  //       }
  //     });
  //   }
  //   console.log(images)
  }

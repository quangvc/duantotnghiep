import { HotelClientService } from './../../services/hotelClient.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subscription, firstValueFrom } from 'rxjs';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { ERROR, URL_IMAGE } from 'src/app/module/_mShared/model/url.class';
import { ImagesService } from 'src/app/module/_mShared/service/images.service';
import { RegionsClientService } from '../../services/regions-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  private subscription = new Subscription();

  sessionUser:any = sessionStorage.getItem('user');
  user:any = JSON.parse(this.sessionUser);

  constructor(
    private HotelClientService: HotelClientService,
    private RegionsClientService: RegionsClientService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    ) { }

  hotels: any[] = [];
  hotelId: any;
  images: any[] = [];
  regions: any[] = [];
  regionId: any;

  menus: MenuItem[] = [];
  statusOption: any;
  role:any;
  confirmModal?: NzModalRef;

  displayImage: boolean = false;

  ngOnInit() {
    this.getHotelsByRegion();
    this.getRegions();
    // if(this.user.role[0] == 'admin'){
    //   this.role = true;
    // }else{
    //   this.role = false;
    // }
  }




  getHotelsByRegion(){
    this.route.params.subscribe(params => {
      const id = params['region_id']; // Lấy giá trị ID từ URL
      this.HotelClientService.getHotelsByRegion(id).subscribe({
        next: (res) => {
          console.log(res.data);
          this.hotels = res.data;
          this.images = res.data

        },
        error: (err) => {{
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }}
      });
    });
  }
  getRegions(){
    let obs = this.RegionsClientService.getRegions().subscribe({
      next: (res) => {
        this.regions = res.data;
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




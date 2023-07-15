import { HotelClientService } from './../../services/hotelClient.service';
import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subscription, firstValueFrom } from 'rxjs';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { ERROR, URL_IMAGE } from 'src/app/module/_mShared/model/url.class';
import { ImagesService } from 'src/app/module/_mShared/service/images.service';
import { RegionsClientService } from '../../services/regions-client.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  private subscription = new Subscription();

  sessionUser: any = sessionStorage.getItem('user');
  user: any = JSON.parse(this.sessionUser);

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
  regionName: any;

  menus: MenuItem[] = [];
  statusOption: any;
  role: any;
  confirmModal?: NzModalRef;

  displayImage: boolean = false;
  starRating: number;
  formStar!: FormGroup;



  ngOnInit() {
    this.getRegions();
    this.getHotelsByRegion();
    this.formStar = new FormGroup({
      value: new FormControl(this.starRating)
    });

    // if(this.user.role[0] == 'admin'){
    //   this.role = true;
    // }else{
    //   this.role = false;
    // }
  }




  getHotelsByRegion() {
    this.route.params.subscribe(params => {
      const id = params['region_id']; // Lấy giá trị ID từ URL
      this.HotelClientService.getHotelsByRegion(id).subscribe({
        next: (res) => {
          console.log(res.data);
          this.hotels = res.data;
          this.images = res.data
          this.regionName = res.data[0].region.name;
          this.formStar.controls['value'].setValue(res.data[0].star_rating);
        },
        error: (err) => {
          {
            console.log('Đã xảy ra lỗi khi gọi API:', err);
          }
        }
      });
    });
  }

  getRegions() {
    let obs = this.RegionsClientService.getRegions().subscribe({
      next: (res) => {
        this.regions = res.data;
        // this.getImage();
      },
      error: (err) => {
        {
          this.message.create(ERROR, err.message);
        }
      }
    })
    this.subscription.add(obs);
  }
}



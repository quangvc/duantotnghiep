import { HotelClientService } from '../../services/hotelClient.service';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subscription, firstValueFrom } from 'rxjs';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { ERROR, URL_IMAGE } from 'src/app/module/_mShared/model/url.class';
import { ImagesService } from 'src/app/module/_mShared/service/images.service';
import { RegionsClientService } from '../../services/regions-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { environment } from 'src/environments/environment';

const PrimaryWhite = '#ffffff';
interface Type {
  name: string;
  code: string;
}
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = PrimaryWhite;
  public loadingTemplate!: TemplateRef<any>;
  sortRadio!: string;
  selectedType!: Type;
  types: Type[] = [];
  rangeValues: number[] = [0, 100];
  // Phân trang
  first: number = 0;
  rows: number = 3;
  // Dữ liệu filter
  date_in: any;
  date_out: any;
  selectedRegion: any;
  // Dữ liệu nhận về
  hotels: any[];
  starRating: number;
  formStar!: FormGroup;
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
  originalHotels: any[] = [];
  totalRecords: number = 0;
  p: any;
  notLogin: boolean = true;

  urlRouter = `${environment.api}/Images`;


  public loading = false;
  private _isExpanded = false;
  private subscription = new Subscription();
  public get isExpanded() {
    return this._isExpanded;
  }

  public set isExpanded(value: boolean) {
     this._isExpanded = value;
  }


  sessionUser: any = sessionStorage.getItem('user');
  user: any = JSON.parse(this.sessionUser);

  constructor(
    private HotelClientService: HotelClientService,
    private RegionsClientService: RegionsClientService,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.getRegions();
    this.route.params.subscribe(params => {
      this.selectedRegion = params['region_id']; // Lấy giá trị ID từ URL
      // Gọi getHotelsByRegion với ID khu vực đã chọn
      this.getHotelsByRegion();
    });
    this.formStar = new FormGroup({
      value: new FormControl(this.starRating)
    });
  }




  // getHotelsByRegion(regionId: any) {
  //   this.HotelClientService.getHotelsByRegion(regionId).subscribe({
  //     next: (res) => {
  //       console.log(res.data);
  //       this.hotels = res.data;
  //       this.images = res.data;
  //       this.regionName = res.data[0].region.name;
  //       this.formStar.controls['value'].setValue(res.data[0].star_rating);
  //     },
  //     error: (err) => {
  //       {
  //         console.log('Đã xảy ra lỗi khi gọi API:', err);
  //       }
  //     }
  //   });
  // }

  async getHotelsByRegion() {
    try {
      this.loading = true;
      const res = await this.HotelClientService.getHotelsByRegion(this.selectedRegion).toPromise();
      if (res) {
        this.loading = false;
      }
      console.log(res.data);
      this.hotels = res.data;
      this.originalHotels = res.data;
      this.images = res.data;
      this.regionName = res.data[0].region.name;
      this.formStar.controls['value'].setValue(res.data[0].star_rating);
    } catch (err) {
      this.loading = false;
      console.error('Đã xảy ra lỗi khi gọi API:', err);
    }
  }

  // Kiểm tra đăng nhập (nếu không đăng nhập thì không có mã giảm)
  async checkLogin() {
    let userLogged: any = sessionStorage.getItem('user');
    let user = JSON.parse(userLogged);
    if (user) {
      this.notLogin = false;
    } else {
      console.log('Không đăng nhập');

    }
  }

  getRegions() {
    let obs = this.RegionsClientService.getRegions().subscribe({
      next: (res) => {
        this.regions = res.data;
        console.log(res.data);

      },
      error: (err) => {
        {
          this.message.create(ERROR, err.message);
        }
      }
    })
    this.subscription.add(obs);
  }
  onRegionSelected(regionId: any) {

    this.router.navigate(['/hotels/region/', regionId]);
    this.getHotelsByRegion()
  }

  onSearch(searchQuery: string) {
    if (searchQuery.trim() === '') {
      this.hotels = this.originalHotels;
      return;
    }
    const filteredHotels = this.originalHotels.filter((hotel) =>
      hotel.hotel_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.hotels = filteredHotels;
  }
  resetSearch() {
    let obs = this.HotelClientService.getHotelsByRegion(this.selectedRegion).subscribe({
      next: (res) => {
        console.log(res.data);
        this.hotels = res.data;
        this.originalHotels = res.data;
        this.images = res.data;
        this.regionName = res.data[0].region.name;
        this.formStar.controls['value'].setValue(res.data[0].star_rating);
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




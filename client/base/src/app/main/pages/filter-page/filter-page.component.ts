import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HotelClientService } from '../../services/hotelClient.service';
import { ERROR, WARNING } from 'src/app/module/_mShared/model/url.class';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { RegionsClientService } from '../../services/regions-client.service';
import { MenuItem } from 'primeng/api';
import { NzModalRef } from 'ng-zorro-antd/modal';
import * as moment from 'moment';

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
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss']
})
export class FilterPageComponent implements OnInit {
  sortRadio!: string;
  selectedType!: Type;
  types: Type[] = [];
  rangeValues: number[] = [0, 100];
  // Phân trang
  first: number = 0;
  rows: number = 5;
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
  notLogin: boolean = true;
  checkin: any;
  checkout: any;
  ParmaCheckIn: any;
  ParmaCheckOut: any;
  visible: boolean = false;
  ReadMore: boolean = true;
  minimumDate: Date;
  p: any;

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }

  private _isExpanded = false;
  private subscription = new Subscription();
  public get isExpanded() {
    return this._isExpanded;
  }

  public set isExpanded(value: boolean) {
    this._isExpanded = value;
  }

  constructor(
    private HotelClientService: HotelClientService,
    private RegionsClientService: RegionsClientService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Tạo ngày hiện tại
    const currentDate = moment();

    // Thêm 1 ngày vào ngày hiện tại
    const nextDay = currentDate.add(2, 'days');

    // Lưu giá trị vào biến minimumDate
    this.minimumDate = nextDay.toDate();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedRegion = params['region_id'];
      const startDateParam = params['checkin'];
      const endDateParam = params['checkout'];
      this.checkin = moment(startDateParam, 'DD-MM-YYYY').toDate();
      this.checkout = moment(endDateParam, 'DD-MM-YYYY').toDate();
      console.log('Ngày bắt đầu: ', this.checkin);
      console.log('Ngày kết thúc: ', this.checkout);
    });
    this.checkLogin();
    this.getRegions();
    this.getHotelsByFilter();
    this.formStar = new FormGroup({
      value: new FormControl(this.starRating)
    });
  }

  getHotelsByFilter() {
    if (moment(this.checkin).isBefore(this.checkout)) {
      sessionStorage.setItem('dateIn', this.checkin.toString());
      sessionStorage.setItem('dateOut', this.checkout.toString());
      const dateIn = moment(this.checkin)?.format('DD-MM-YYYY') || '';
      const dateOut = moment(this.checkout)?.format('DD-MM-YYYY') || '';
      const obs = this.HotelClientService.findHotels(this.selectedRegion, dateIn, dateOut).subscribe({
        next: (res) => {
          this.hotels = res.data
          console.log(res);
          this.formStar.controls['value'].setValue(res.data[0].star_rating);
        },
        error: (err) => {
          {
            console.log('Đã xảy ra lỗi khi gọi API:', err);
          }
        }
      });
      this.subscription.add(obs);
    } else {
      this.message.create(WARNING, 'Vui lòng nhập Ngày nhận phòng < ngày trả phòng');
    }

  };


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
    const startDate = moment(this.checkin).format('DD-MM-YYYY');
    const endDate = moment(this.checkout).format('DD-MM-YYYY');
    this.router.navigate(['/hotels/get', regionId, startDate, endDate]);
    this.getHotelsByFilter()
  }
  onChangeDate() {
    const startDate = moment(this.checkin).format('DD-MM-YYYY');
    const endDate = moment(this.checkout).format('DD-MM-YYYY');
    this.router.navigate(['/hotels/get', this.selectedRegion, startDate, endDate]);
    this.getHotelsByFilter()
  }

  onclick() {
    this.ReadMore = !this.ReadMore;
    this.visible = !this.visible;
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

  async checkLogin() {
    let userLogged: any = sessionStorage.getItem('user');
    let user = JSON.parse(userLogged);
    if (user) {
      this.notLogin = false;
    } else {
      console.log('Không đăng nhập');

    }
  }

  // resetSearch() {
  //   let obs = this.HotelClientService.getHotelsByRegion(this.selectedRegion).subscribe({
  //     next: (res) => {
  //       console.log(res.data);
  //       this.hotels = res.data;
  //       this.originalHotels = res.data;
  //       this.images = res.data;
  //       this.regionName = res.data[0].region.name;
  //       this.formStar.controls['value'].setValue(res.data[0].star_rating);
  //     },
  //     error: (err) => {
  //       {
  //         this.message.create(ERROR, err.message);
  //       }
  //     }
  //   })
  //   this.subscription.add(obs);
  // }

  resetdate() {
    this.checkin = '';
    this.checkout = '';

    // this.firstTable = true;
    // this.dataTable = false;
  }
}

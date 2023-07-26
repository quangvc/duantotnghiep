import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HotelClientService } from '../../services/hotelClient.service';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { RegionsClientService } from '../../services/regions-client.service';
import { MenuItem } from 'primeng/api';
import { NzModalRef } from 'ng-zorro-antd/modal';

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
  ) { }

  ngOnInit() {
    this.getRegions();
    this.route.params.subscribe(params => {
      const id = params['region_id']; // Lấy giá trị ID từ URL
      const checkin = params['checkin']; // Lấy giá trị ID từ URL
      const checkout = params['checkout']; // Lấy giá trị ID từ URL
      this.getHotelsByFilter(id, checkin, checkout);
    });
    const defaultRegionId = this.route.snapshot.params['region_id'];
    this.selectedRegion = `regionRadio${defaultRegionId}`;
    this.formStar = new FormGroup({
      value: new FormControl(this.starRating)
    });
  }
  getHotelsByFilter(id: any, checkin: any, checkout: any) {
    const obs = this.HotelClientService.findHotels(id, checkin, checkout).subscribe({
      next: (res) => {
        this.hotels = res
        console.log(res);
        this.formStar.controls['value'].setValue(res[0].star_rating);
      },
      error: (err) => {
        {
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }
      }
    });
    this.subscription.add(obs);
  };

  async getHotelsByRegion(regionId: any) {
    try {
      const res = await this.HotelClientService.getHotelsByRegion(regionId).toPromise();
      console.log(res.data);
      this.hotels = res.data;
      this.originalHotels = res.data;
      this.images = res.data;
      this.regionName = res.data[0].region.name;
      this.formStar.controls['value'].setValue(res.data[0].star_rating);
    } catch (err) {
      console.error('Đã xảy ra lỗi khi gọi API:', err);
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
    debugger
    this.selectedRegion = regionId;
    this.getHotelsByRegion(regionId);
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

import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HotelClientService } from '../../services/hotelClient.service';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

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
    private message: NzMessageService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.getHotelsByFilter();
    this.formStar = new FormGroup({
      value: new FormControl(this.starRating)
    });
    this.types = [
      { name: 'Phòng / Đêm', code: '1' },
      { name: 'Tổng giá tiền', code: '2' }
    ];
  }
  getHotelsByFilter() {
    this.route.params.subscribe(params => {
      const id = params['region_id']; // Lấy giá trị ID từ URL
      const checkin = params['checkin']; // Lấy giá trị ID từ URL
      const checkout = params['checkout']; // Lấy giá trị ID từ URL
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
    });
  }
}

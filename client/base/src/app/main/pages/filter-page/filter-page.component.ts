import { Component, OnInit } from '@angular/core';

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
  onPageChange(event: PageEvent) {
      this.first = event.first;
      this.rows = event.rows;
  }

  private _isExpanded = false;

  public get isExpanded() {
    return this._isExpanded;
  }

  public set isExpanded(value: boolean) {
     this._isExpanded = value;
  }

  ngOnInit() {

    this.types = [
      { name: 'Phòng / Đêm', code: '1' },
      { name: 'Tổng giá tiền', code: '2' }
    ];


  }
}

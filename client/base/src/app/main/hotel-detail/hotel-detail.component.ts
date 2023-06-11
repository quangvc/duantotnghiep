import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
interface Type {
  name: string;
  code: string;
}

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  checked: boolean = false;
  types: Type[] = [];

  selectedType!: Type;

  ngOnInit() {
      this.types = [
          { name: 'Hiển thị giá', code: 'NY' },
          { name: 'Thành tiền', code: '1' },
          { name: '1 Đêm', code: '2' }
      ];
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { RegionsService } from 'src/app/module/_mShared/service/regions.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent implements OnInit, OnDestroy {

  displayCreateUpdateRegion: boolean = false;

  constructor(
    private regionService: RegionsService
  ) { }

  regions: any[] = [];
  region: any;
  menus: MenuItem[] = [];

  ngOnInit() {
    this.getRegion();
  }

  getRegion(){
    let obs = this.regionService.getRegion().subscribe((res) => {
      this.regions = res;
    })

  }

  dropdownItemsButton(data:any){
    this.menus = [
      {
        label: "Chỉnh sửa",
        command: () => {
          this.editRegion(data);
        },
      },
      { separator: true},
      {
        label: "Xóa",
        command: () => {
          console.log(3);
        },
      },
    ]
  }

  addRegion(){
    this.displayCreateUpdateRegion = true;
  }

  editRegion(region:any){
    this.region = region;
    this.displayCreateUpdateRegion = true;
  }

  cancel(event:any){
    this.displayCreateUpdateRegion = false;
    this.getRegion();
  }

  ngOnDestroy(){

  }

}

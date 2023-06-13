import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NineStatus } from 'src/app/module/_mShared/enum/enum';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { Enum } from 'src/app/module/_mShared/service/enum.service';
import { RegionsService } from 'src/app/module/_mShared/service/regions.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  displayCreateUpdateRegion: boolean = false;

  constructor(
    private regionService: RegionsService
  ) { }

  regions: any[] = [];
  region: any;
  menus: MenuItem[] = [];

  statusOption: any;

  ngOnInit() {
    this.getRegion();
    this.getOptionEnum();
  }

  getOptionEnum(){
    this.statusOption = Enum.convertEnum(NineStatus);
  }

  viewNameStatus(regions:any){
    for (const item of regions) {
      this.statusOption.forEach((status:any) => {
        if(item.status == status.value){
          item.txtStatus = status.text;
        }
      });
    }
  }

  getRegion(){
    let obs = this.regionService.getRegion().subscribe((res) => {
      this.regions = res;
      this.viewNameStatus(this.regions);
    })

    this.subscription.add(obs);
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
    this.subscription.unsubscribe();
  }

}

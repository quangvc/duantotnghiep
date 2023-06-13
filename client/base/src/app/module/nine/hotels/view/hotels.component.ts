import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { NineStatus } from 'src/app/module/_mShared/enum/enum';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { Enum } from 'src/app/module/_mShared/service/enum.service';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
import { RegionsService } from 'src/app/module/_mShared/service/regions.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  displayCreateUpdateHotel: boolean = false;

  constructor(
    private hotelsService: HotelsService,
    private regionsService: RegionsService,
    ) { }

  hotels: any[] = [];
  hotel: any;
  menus: MenuItem[] = [];
  statusOption: any;

  ngOnInit() {
    this.getHotels();
    this.getOptionEnum();
  }

  getOptionEnum(){
    this.statusOption = Enum.convertEnum(NineStatus);
  }

  getHotels(){
    let obs = this.hotelsService.getHotels().subscribe((res) => {
      this.hotels = res;
      this.viewNameStatus(this.hotels);
      this.viewNameRegion(this.hotels);
    })
    this.subscription.add(obs);
  }

  viewNameStatus(hotels:any){
    for (const item of hotels) {
      this.statusOption.forEach((status:any) => {
        if(item.status == status.value){
          item.txtStatus = status.text;
        }
      });
    }
  }

  async viewNameRegion(hotels:any){
    for (const item of hotels) {
      let region : any[] = await firstValueFrom(this.regionsService.getRegion());
      for (const iterator of region) {
        if(item.region_id == iterator.id){
          item.txtRegion = iterator.name;
        }
      }
    }
  }

  dropdownItemsButton(data:any){
    this.menus = [
      {
        label: "Chỉnh sửa",
        command: () => {
          this.editHotel(data);
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

  addHotel(){
    this.displayCreateUpdateHotel = true;
  }

  editHotel(hotel:any){
    this.displayCreateUpdateHotel = true;
    this.hotel = hotel;
  };

  cancel(event:any){
    this.displayCreateUpdateHotel = false;
    this.getHotels();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

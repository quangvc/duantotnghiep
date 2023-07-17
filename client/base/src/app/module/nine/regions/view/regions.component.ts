import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subscription, firstValueFrom } from 'rxjs';
import { NineStatus } from 'src/app/module/_mShared/enum/enum';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { Enum } from 'src/app/module/_mShared/service/static/enum.service';
import { RegionsService } from 'src/app/module/_mShared/service/regions.service';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  displayCreateUpdateRegion: boolean = false;

  constructor(
    private regionService: RegionsService,
    private hotelService: HotelsService,
    private message: NzMessageService,
    private modal: NzModalService
  ) { }

  confirmModal?: NzModalRef;

  regions: any[] = [];
  regionId: any;
  menus: MenuItem[] = [];

  statusOption: any;

  role: boolean = false;

  ngOnInit() {
    this.getRegion();
    this.getOptionEnum();
    this.checkRole();
  }

  checkRole(){
    if(Auth.Admin()){
      this.role = true;
    }else{
      this.role = false;
    }
  }


  getOptionEnum(){
    this.statusOption = Enum.convertEnum(NineStatus);
  }

  // viewNameStatus(regions:any){
  //   for (const item of regions) {
  //     this.statusOption.forEach((status:any) => {
  //       if(item.status == status.value){
  //         item.txtStatus = status.text;
  //       }
  //     });
  //   }
  // }

  getRegion(){
    let obs = this.regionService.getRegions().subscribe({
      next: (res) => {
        this.regions = res.data;
      },
      error: (err) => {
        this.message.create(ERROR, `${err.error.message}`)
        this.message.create(ERROR, `${err.message}`)
      }
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
          this.showConfirm(data);
        },
      },
    ]
  }

  addRegion(){
    this.displayCreateUpdateRegion = true;
    this.regionId = null;
  }

  editRegion(region:any){
    this.regionId = region.id;
    this.displayCreateUpdateRegion = true;
  }

  showConfirm(data:any){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Xác nhận xóa ${data.name} !!`,
      nzContent: `Bạn có muốn xóa ${data.name} không ?`,
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.deleteRegion(data);
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }

  async deleteRegion(data:any){
    let hotels:any = await firstValueFrom(this.hotelService.getHotels());
    if(hotels.data.length > 0) {
      this.message.create(ERROR, `Không thể xóa Khu vực ${data.name}, tồn tại một trường liên kết với khu vực ${data.name}`)
    }else{
      this.regionService.deleteRegion(data.id).subscribe({
        next: (res) => {
          this.message.create(SUCCESS, `Xóa ${data.name} thành công.`)
          this.getRegion();
        },
        error: (err) => {
          this.message.create(ERROR, `${err.error.message}`)
          this.message.create(ERROR, `${err.message}`)
        }
      })
    }

  }

  cancel(event:any){
    this.displayCreateUpdateRegion = false;
    this.getRegion();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

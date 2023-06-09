import { async } from '@angular/core/testing';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { NineStatus } from 'src/app/module/_mShared/enum/enum';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { ERROR, SUCCESS, URL_IMAGE } from 'src/app/module/_mShared/model/url.class';
import { Enum } from 'src/app/module/_mShared/service/enum.service';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
import { ImagesService } from 'src/app/module/_mShared/service/images.service';
import { RegionsService } from 'src/app/module/_mShared/service/regions.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  displayCreateUpdateHotel: boolean = false;

  sessionUser:any = sessionStorage.getItem('user');
  user:any = JSON.parse(this.sessionUser);

  constructor(
    private hotelsService: HotelsService,
    private imagesService: ImagesService,
    private message: NzMessageService,
    private modal: NzModalService
    ) { }

  hotels: any[] = [];
  hotelId: any;
  menus: MenuItem[] = [];
  statusOption: any;
  role:any;
  confirmModal?: NzModalRef;

  displayImage: boolean = false;

  ngOnInit() {
    this.getHotels();
    this.getOptionEnum();
    if(this.user.role[0] == 'admin'){
      this.role = true;
    }else{
      this.role = false;
    }
  }

  getOptionEnum(){
    this.statusOption = Enum.convertEnum(NineStatus);
  }

  getHotels(){
    let obs = this.hotelsService.getHotels().subscribe({
      next: (res) => {
        this.hotels = res.data;
        this.getImage();
      },
      error: (err) => {{
        this.message.create(ERROR, err.message);
      }}
    })
    this.subscription.add(obs);
  }

  async getImage(){
    let images:any[] = await firstValueFrom(this.imagesService.getImages());

    for (const item of this.hotels) {
      images.forEach(img => {
        if(img.hotel_id == item.id){
          item.image = `${URL_IMAGE}/${img.path}`;
        }
      });
    }
    console.log(images)
  }

  dropdownItemsButton(data:any){
    this.menus = [
      {
        label: "Chỉnh sửa",
        command: () => {
          this.editHotel(data);
        },
      },
      {
        label: "Cài đặt hình ảnh",
        command: () => {
          this.showModalImg(data);
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
    this.hotelId = hotel.id;
  };

  confirmChangeStatus(event:any, data:any){

    this.confirmModal = this.modal.confirm({
      nzTitle: `Xác thực sự kiện !!`,
      nzContent: 'Xác nhận thay đổi trạng thái ?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.changeStatus(data);
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });

  }

  changeStatus(data:any){

    let obs = this.hotelsService.changeStatus(data.id).subscribe({
      next: (res) => {
        this.message.create(SUCCESS, "Cập nhật thành công !!");
        this.getHotels();
      },
      error: (err) => {
        this.getHotels();
        this.message.create(ERROR, err.error.message);
      }
    })
    this.subscription.add(obs);
  }

  showModalImg(hotel:any){
    this.hotelId = hotel.id;
    this.displayImage = true;
  }

  cancel(event:any){
    this.displayCreateUpdateHotel = false;
    this.displayImage = false;
    this.getHotels();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

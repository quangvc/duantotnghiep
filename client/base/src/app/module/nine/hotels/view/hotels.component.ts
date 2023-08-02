import { async } from '@angular/core/testing';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { NineStatus } from 'src/app/module/_mShared/enum/enum';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { ERROR, SUCCESS, URL_IMAGE, WARNING } from 'src/app/module/_mShared/model/url.class';
import { Enum } from 'src/app/module/_mShared/service/static/enum.service';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
import { ImagesService } from 'src/app/module/_mShared/service/images.service';
import { RegionsService } from 'src/app/module/_mShared/service/regions.service';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { RoomTypeService } from 'src/app/module/_mShared/service/room_type.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  displayCreateUpdateHotel: boolean = false;
  displayDetail: boolean = false;

  constructor(
    private hotelsService: HotelsService,
    private roomTypeService: RoomTypeService,
    private imagesService: ImagesService,
    private message: NzMessageService,
    private modal: NzModalService
    ) { }

  hotels: any[] = [];
  hotelId: any;

  roomTypes: any[]=[];

  menus: MenuItem[] = [];
  statusOption: any;
  role:any;
  confirmModal?: NzModalRef;

  hotel_name: any;

  displayImage: boolean = false;

  ngOnInit() {
    this.getHotels();
    this.getOptionEnum();
    this.checkRole();
  }

  checkRole(){
    switch (Auth.User('role')) {
      case 'admin':
        return this.role = true;
        break;
      case 'manager':
        return this.role = true;
        break;
      default:
        return this.role = false;
        break;
    }
  }

  getOptionEnum(){
    this.statusOption = Enum.convertEnum(NineStatus);
  }

  getHotels(){
    let obs = this.hotelsService.getHotels().subscribe({
      next: (res) => {
        this.hotels = res.data;
        console.log(this.hotels)
        this.getImage();
      },
      error: (err) => {{
        this.message.create(ERROR, err.error.message);
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
  }
  // menu button
  dropdownItemsButton(data:any){
    this.menus = [
      {
        label: "Loại phòng",
        command: () => {
          this.detail(data);
        },
      },
      {
        label: "Chỉnh sửa",
        command: () => {
          this.editHotel(data);
        },
        visible: Auth.User('role') == "admin"
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
          this.showConfirm(data);
        },
      },
    ]
  }

  // detail
  detail(data:any){
    this.displayDetail = true;
    this.hotelId = data.id;
    this.roomTypes = data.room_type;
    this.hotel_name = data.hotel_name;
  }

  // add edit
  addHotel(){
    this.displayCreateUpdateHotel = true;
    this.hotelId = null;
  }

  editHotel(hotel:any){
    this.displayCreateUpdateHotel = true;
    this.hotelId = hotel.id;
  };

  // status
  confirmChangeStatus(event:any, data:any){

    if(Auth.User('role') == 'admin')
    this.confirmModal = this.modal.confirm({
      nzTitle: `Xác thực sự kiện !!`,
      nzContent: 'Xác nhận thay đổi trạng thái ?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.changeStatus(data);
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }),
      nzOnCancel: () => {
        this.getHotels();
      }
    });

    else this.message.create(WARNING, `Bạn không đủ quyền truy cập!`);

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
        this.message.create(ERROR, err.message);
      }
    })
    this.subscription.add(obs);
  }

  // delete
  showConfirm(data:any){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Xác nhận xóa ${data.name} !!`,
      nzContent: `Bạn có muốn xóa ${data.name} không ?`,
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.deleteHotel(data);
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }).catch()
    });
  }

  async deleteHotel(data:any){
    let hotels:any = await firstValueFrom(this.roomTypeService.getRoomTypes());
    if(hotels.data.length > 0) {
      this.message.create(ERROR, `Không thể xóa ${data.hotel_name}, tồn tại một trường liên kết với ${data.hotel_name}`)
    }else{
      this.hotelsService.deleteHotel(data.id).subscribe({
        next: (res) => {
          this.message.create(SUCCESS, `Xóa ${data.hotel_name} thành công.`)
          this.getHotels();
        },
        error: (err) => {
          this.message.create(ERROR, `${err.error.message}`)
          this.message.create(ERROR, `${err.message}`)
        }
      })
    }

  }

  showModalImg(hotel:any){
    this.hotelId = hotel.id;
    this.displayImage = true;
  }

  cancel(event:any){
    this.displayCreateUpdateHotel = false;
    this.displayImage = false;
    this.displayDetail = false;
    this.getHotels();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BannersService } from '../../_mShared/service/banners.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR, SUCCESS, WARNING } from '../../_mShared/model/url.class';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImagesService } from '../../_mShared/service/images.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Enum } from '../../_mShared/service/static/enum.service';
import { NineStatus } from '../../_mShared/enum/enum';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/auth/_aShared/auth.class';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit,OnDestroy {

  private subscription = new Subscription();
  // formBanner: FormGroup

  constructor(
    private bannersService: BannersService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private imageService: ImagesService,
    private modal: NzModalService
    ) { }

    confirmModal?: NzModalRef;


  banners: any[] = [];
  banner:any

  displayMultipleImage: boolean = false;

  // dataImage: any[] = [];
  formData = new FormData();

  statusOption: any[] = [];

  ngOnInit() {
    this.getBanners();
    this.getOptionEnum();
  }

  getOptionEnum(){
    this.statusOption = Enum.convertEnum(NineStatus);
  }


  getBanners(){
    let obs = this.bannersService.getBanners().subscribe({
      next: (res) => {
        this.banners = res.data;
        console.log(res)

        for (const banner of this.banners) {
          this.statusOption.forEach((status: any) => {
            if(status.value == banner.status){
              banner.txtStatus = status.text;
            }
          })
        }

      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })

    this.subscription.add(obs);
  }

  addBanner(){
    this.displayMultipleImage = true;
    this.banner = "banner"
  }

  showConfirmDelete(id:any){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you Want to delete?`,
      nzContent: 'Khi bấm nút OK, cửa sổ sẽ đóng lại sau 1 giây',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.deleteBanner(id);
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }).catch()
    });
  }

  deleteBanner(id:any){
    this.bannersService.deleteBanner(id).subscribe({
      next: (res) => {
        this.message.create(SUCCESS, `Xóa thành công.`)
        this.getBanners();
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })
  }

  submitForm(event:any){
    this.displayMultipleImage = false;
    this.getBanners();
  }

  confirmChangeStatus(event:any, data:any){

    if(Auth.Admin())
    this.confirmModal = this.modal.confirm({
      nzTitle: `Xác thực sự kiện !!`,
      nzContent: 'Xác nhận thay đổi trạng thái ?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.changeStatus(data);
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }),
      nzOnCancel: () => {
        this.getBanners();
      }
    });

    else this.message.create(WARNING, `Bạn không đủ quyền truy cập!`);

  }

  changeStatus(data:any){

    let obs = this.bannersService.changeStatus(data.id).subscribe({
      next: (res) => {
        console.log(res)
        this.message.create(SUCCESS, "Cập nhật thành công !!");
        this.getBanners();
      },
      error: (err) => {
        this.getBanners();
        this.message.create(ERROR, err.error.message);
        this.message.create(ERROR, err.message);
      }
    })
    this.subscription.add(obs);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

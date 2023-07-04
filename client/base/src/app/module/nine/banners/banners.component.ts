import { Component, OnDestroy, OnInit } from '@angular/core';
import { BannersService } from '../../_mShared/service/banners.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR, SUCCESS } from '../../_mShared/model/url.class';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImagesService } from '../../_mShared/service/images.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Enum } from '../../_mShared/service/enum.service';
import { NineStatus } from '../../_mShared/enum/enum';
import { Subscription } from 'rxjs';

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
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { BannersService } from '../../_mShared/service/banners.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR, SUCCESS } from '../../_mShared/model/url.class';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImagesService } from '../../_mShared/service/images.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {

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

  ngOnInit() {
    this.getBanners();
  }

  getBanners(){
    let obs = this.bannersService.getBanners().subscribe({
      next: (res) => {
        this.banners = res.data;
        console.log(res)
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })
  }

  addBanner(){
    this.displayMultipleImage = true;
    this.banner = "banner"
  }

  handleOk(){

    // const imageFiles: FileList = this.dataImage;
    // const formData = new FormData();
    // let imgFile: FileList = this.dataImage
    // for (let i = 0; i < this.dataImage.length; i++) {
    //   const element = this.dataImage[i];
    //   formData.append('images', this.dataImage[i], this.dataImage[i].name);
    //   console.log(element)
    // }

    // this.bannersService.createBanner(formData).subscribe({
    //   next: (res) => {
    //     console.log(res)
    //     this.message.create(SUCCESS, `Thêm mới thành công.`)
    //   },
    //   error: (err) => {
    //     this.message.create(ERROR, err.error.message);
    //   }
    // })
    // console.log()
  }

  showConfirmDelete(id:any){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you Want to delete?`,
      nzContent: 'Khi bấm nút OK, cửa sổ sẽ đóng lại sau 1 giây',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.deleteBanner(id);
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
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

        // for (let i = 0; i < fileList.length; i++) {
    //   const file: File = fileList[i];
    //   formData.append(`image[${i}]`, file);
    // }

    // console.log(event)
    // const imageFiles: FileList = event;
    // for (let i = 0; i < event.length; i++) {
    //   this.formData.append('images', imageFiles[i])
    //   console.log(this.formData)
    // }
    this.displayMultipleImage = false;
    this.getBanners();
  }

  handleCancel(){

  }
}

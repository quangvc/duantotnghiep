import { Component, OnInit } from '@angular/core';
import { BannersService } from '../../_mShared/service/banners.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR, SUCCESS } from '../../_mShared/model/url.class';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    private fb: FormBuilder
    ) { }

  banners: any[] = [];

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

  submitForm(event:any){
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { ImagesService } from 'src/app/module/_mShared/service/images.service';

@Component({
  selector: 'hotel-image',
  templateUrl: './image.component.html'
})
export class ImageComponent implements OnInit {

  @Input() displayImage: boolean;
  @Input() hotel_id:any;
  @Output() closeModal = new EventEmitter<any>();

  images: any[]=[];

  constructor(
    private imageService: ImagesService,
    private message: NzMessageService,
    private modal: NzModalService
    ) { }

  confirmModal?: NzModalRef;

  displayMultipleImage: boolean = false;

  isLoading: boolean = false;

  allChecked = false;
  indeterminate = true;
  checkOptionsOne = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear', checked: false },
    { label: 'Orange', value: 'Orange', checked: false }
  ];

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne = this.checkOptionsOne.map(item => ({
        ...item,
        checked: true
      }));
    } else {
      this.checkOptionsOne = this.checkOptionsOne.map(item => ({
        ...item,
        checked: false
      }));
    }
  }

  updateSingleChecked(): void {
    if (this.checkOptionsOne.every(item => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every(item => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }

  ngOnInit() {
    this.getImages();
  }

  getImages(){
    this.imageService.getImages().subscribe({
      next: (res) => {
        this.images = res;
        this.images = this.images.filter(img => img.hotel_id == this.hotel_id);
        console.log(this.images)
      },
      error: (err) => {this.message.create(ERROR, err.error.message);}
    })
  }

  addImage(){
    this.displayMultipleImage = true;
  }
  imageId: any;
  editImage(data:any){
    this.displayMultipleImage = true;
    this.imageId = data.id
  }

  saveImage(file:any){
    const formData = new FormData();

    if(file){
      this.isLoading = true;
      formData.append('path', file[0])
      this.imageService.addImage(this.hotel_id,formData).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.displayMultipleImage = false;
          this.getImages();
        },
        error: (err) => {
          this.isLoading = false;
          this.message.create(ERROR, err.error.message);
        },
      });
    }

  }

  showConfirmDelete(id:any){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you Want to delete ?`,
      nzContent: 'Khi bấm nút OK, cửa sổ sẽ đóng lại sau 1 giây',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.deleteImage(id);
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }

  deleteImage(id:any){
    this.imageService.deleteImage(id).subscribe({
      next: (res) => {
        this.message.create(SUCCESS, `Xóa thành công.`)
        this.getImages();
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })
  }

  handleOk(){

  }

  cancelModal(event:any){
    this.displayMultipleImage = false;
  }

  handleCancel(){
    this.closeModal.emit();
  }

}

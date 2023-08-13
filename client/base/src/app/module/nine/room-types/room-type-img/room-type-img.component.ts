import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { ImagesService } from 'src/app/module/_mShared/service/images.service';

@Component({
  selector: 'room-type-img',
  templateUrl: './room-type-img.component.html',
  styleUrls: ['./room-type-img.component.scss']
})
export class RoomTypeImgComponent implements OnInit {

  @Input() displayImage: boolean;
  @Input() roomTypeId:any;
  @Output() closeModal = new EventEmitter<any>();

  constructor(
    private message: NzMessageService,
    private imageService: ImagesService,
    private modal: NzModalService
    ) { }

    confirmModal?: NzModalRef;

  displayMultipleImage: boolean = false;

  isLoading: boolean = false;

  images:any[] = [];

  ngOnInit() {
    this.getImages();
  }

  getImages(){
    this.imageService.getImages().subscribe({
      next: (res) => {
        this.images = res;
        this.images = this.images.filter(img => img.room_type_id == this.roomTypeId);
        console.log(res)
      },
      error: (err) => {this.message.create(ERROR, err.error.message);}
    })
  }

  handleOk(){

  }

  addImage(){
    this.displayMultipleImage = true;
  }

  saveImage(file:any){
    const formData = new FormData();

    if(file){
      this.isLoading = true;
      formData.append('path', file[0])
      this.imageService.addImageRoomType(this.roomTypeId,formData).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.message.create(SUCCESS, "Thêm mới thành công!!");
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

  cancelModal(event:any){
    this.displayMultipleImage = false;
  }

  handleCancel(){
    this.closeModal.emit();
  }

  showConfirmDelete(id:any){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you Want to delete ?`,
      nzContent: 'Khi bấm nút OK, cửa sổ sẽ đóng lại sau 1 giây',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.deleteImage(id);
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }).catch()
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

}

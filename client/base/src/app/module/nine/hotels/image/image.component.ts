import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
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

  constructor(private imageService: ImagesService,
    private message: NzMessageService,
    ) { }

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
      },
      error: (err) => {this.message.create(ERROR, err.error.message);}
    })
  }

  handleOk(){

  }

  handleCancel(){
    this.closeModal.emit();
  }

}

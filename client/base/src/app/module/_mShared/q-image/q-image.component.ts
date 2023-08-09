import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BannersService } from '../service/banners.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR } from '../model/url.class';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImagesService } from '../service/images.service';
import { NineStatus } from '../enum/enum';

declare let $: any;
@Component({
  selector: 'q-image',
  templateUrl: './q-image.component.html',
  styleUrls: ['./q-image.component.scss']
})
export class QImageComponent implements OnInit {
  @Input() displayMultipleImage: boolean;
  @Input() hotel: any;
  @Input() imageId: any;
  @Input() banner: any

  @Input() roomType: any;
  @Output() closeModal = new EventEmitter<any>();
  @Output() cancelModal = new EventEmitter<any>();

  constructor(
      private message: NzMessageService,
      private fb: FormBuilder,
      private imageService: ImagesService,
      private bannersService: BannersService
    ){ }

  @ViewChild('fileUploader') fileUploader:ElementRef;

  selectedOption:any[] = [];

  checkOptionsOne: any[] = [];

  selectedFiles: File[] = [];

  formBanner!: FormGroup

  isLoading: boolean = false;

  ngOnInit() {
    this.formBanner = this.fb.group({
      image: [[]]
    })
  }
  allChecked = false;
  indeterminate = false;

  updateAllChecked(): void {
    if (this.allChecked) {
      this.checkOptionsOne = this.checkOptionsOne.map(item => ({
        ...item,
        checked: true
      }));
      this.selectedOption.push(...this.checkOptionsOne);
    } else {
      this.checkOptionsOne = this.checkOptionsOne.map(item => ({
        ...item,
        checked: false
      }));
      this.selectedOption = [];
    }
  }

  log(value: string[]): void {
    if(value.length === this.checkOptionsOne.length){
      this.indeterminate = false;
      this.allChecked = true;
    }else{
      this.indeterminate = true;
      this.allChecked = false;
    }
    if(value.length == 0){
      this.indeterminate = false;
    }
  }



  onFileChange(event:any){

    // if(this.banner){
    //   this.selectedFiles.push(event.target.files);
    //   if(event.target.files){
    //     for (let i = 0; i < File.length; i++) {
    //       const reader = new FileReader();
    //       reader.readAsDataURL(event.target.files[i]);
    //       reader.onload = (events: any) =>  {
    //         let dataImage = {
    //           url: events.target.result,
    //           checked: false
    //         }
    //         this.checkOptionsOne.push(dataImage);
    //         this.fileUploader.nativeElement.value = null;
    //       }

    //     }
    //   }
    // }
  }

  handleOk(){
    const formData = new FormData();
    let file = $('#fileSingle').prop('files');
    let files = $('#file').prop('files');

    if(this.banner){
      this.isLoading = true;
      const fileList: FileList = files;

      for (let i = 0; i < fileList.length; i++) {
        const file: File = fileList[i];
        formData.append(`image[${i}]`, file);
        formData.append('status', String(NineStatus.Active));
      }

      this.bannersService.createBanner(formData).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.cancelModal.emit()
        },
        error: (err) => {
          this.isLoading = false;
          this.message.create(ERROR, err.error.message);
        }
      })
    }

    if(this.hotel){
      if(file){
        this.closeModal.emit(file)
      }
    }

    if(this.roomType){
      if(file){
        this.closeModal.emit(file)
      }
    }

  }

  handleCancel(){
    this.cancelModal.emit();
  }

}

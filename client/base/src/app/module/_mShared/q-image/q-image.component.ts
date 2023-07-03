import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BannersService } from '../service/banners.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR } from '../model/url.class';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

declare let $: any;
@Component({
  selector: 'q-image',
  templateUrl: './q-image.component.html',
  styleUrls: ['./q-image.component.scss']
})
export class QImageComponent implements OnInit {
  @Input() displayAddBanner: boolean;
  @Output() closeModal = new EventEmitter<any>();

  constructor( private bannersService: BannersService,private message: NzMessageService, private fb: FormBuilder) { }

  selectedOption:any[] = [];

  checkOptionsOne: any[] = [];

  selectedFiles: File[];

  formBanner!: FormGroup

  selectedFile: any;

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

  // @ViewChild('fileUploader') fileUploader:ElementRef;

  onFileChange(event:any){

    // this.selectedFiles = event.target.files;
    // if(event.target.files){
      const imageFiles: FileList = event.target.files;
    //   const formData = new FormData();
    //   this.closeModal.emit(imageFiles);

      // for (let i = 0; i < File.length; i++) {
      //   const reader = new FileReader();
      //   reader.readAsDataURL(event.target.files[i]);
      //   reader.onload = (events: any) =>  {
      //     let dataImage = {
      //       url: events.target.result,
      //       checked: false
      //     }
      //     this.checkOptionsOne.push(dataImage);
      //     this.fileUploader.nativeElement.value = null;
      //   }

    //   }
    // }
  }



  handleOk(){
    const formData = new FormData();
    let newData:any[] = [];
    let file = $('#file').prop('files');

    const fileList: FileList = file;

    for (let i = 0; i < fileList.length; i++) {
      const file: File = fileList[i];
      formData.append(`image[${i}]`, file);
    }

    this.bannersService.createBanner(formData).subscribe({
      next: (res) => {this.closeModal.emit()},
      error: (err) => {this.message.create(ERROR, err.error.message);}
    })

  }

  handleCancel(){

  }

}

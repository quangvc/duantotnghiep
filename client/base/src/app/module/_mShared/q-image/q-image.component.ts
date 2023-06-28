import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'q-image',
  templateUrl: './q-image.component.html',
  styleUrls: ['./q-image.component.scss']
})
export class QImageComponent implements OnInit {

  constructor() { }

  selectedOption:any[] = [];

  checkOptionsOne = [
    { url: 'https://cdn.baogiaothong.vn/upload/2-2022/images/2022-05-25/2-1653445668-926-width740height481.jpg', checked: false },
    { url: 'https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg', checked: false },
  ];

  listOfFiles: any[] = [];

  ngOnInit() {

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

  @ViewChild('fileUploader') fileUploader:ElementRef;

  selectedFiles(event:any){
    if(event.target.files){
      this.listOfFiles.push(...event.target.files)
      console.log(this.listOfFiles)
      for (let i = 0; i < File.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (events: any) =>  {
          let dataImage = {
            url: events.target.result,
            checked: false
          }
          this.checkOptionsOne.push(dataImage);
          this.fileUploader.nativeElement.value = null;
        }

      }
    }
  }

}

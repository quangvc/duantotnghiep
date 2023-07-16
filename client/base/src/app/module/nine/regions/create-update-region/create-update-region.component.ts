import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { RegionsService } from 'src/app/module/_mShared/service/regions.service';

declare let $: any;

@Component({
  selector: 'create-update-region',
  templateUrl: './create-update-region.component.html'
})
export class CreateUpdateRegionComponent implements OnInit {

  @Input() displayCreateUpdateRegion: boolean = false;
  @Input() regionId: any;

  @Output() closeModal = new EventEmitter<any>();

  formRegion!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private regionService: RegionsService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.formBuilderRegion();
    this.getValueRegion();
  }

  private formBuilderRegion(){
    this.formRegion = this.fb.group({
      name: [null, Validators.required],
    })
  }

  getValueRegion(){
    if(this.regionId){
      this.regionService.findOne(this.regionId).subscribe({
        next: (res) => {
          this.formRegion.patchValue({
            name: res.data.name,
          })
        },
        error: (err) => {
          this.message.create(ERROR, `${err.error.message}`)
          this.message.create(ERROR, `${err.message}`)
        }
      })
    }
  }

  handleOk(){

    if(this.formRegion.valid){

      const formData = new FormData();

      formData.append('name', this.formRegion.value.name);

      let file = $('#file').prop('files');

      if(file.length > 0){
        formData.append("image", file[0]);
      }

      let createUpdate;

      if(this.regionId){
        createUpdate = this.regionService.updateRegion(this.regionId, formData);
      }else{
        createUpdate = this.regionService.createRegion(formData);
      }

      createUpdate.subscribe({
        next: (res) => {
          console.log(res)
          // this.closeModal.emit();
          this.message.create(SUCCESS, `${res.message}`);
        },
        error: (err) => {
          this.message.create(ERROR, `${err.error.message}`)
          this.message.create(ERROR, `${err.message}`)
        }
      })
    }
  }

  handleCancel(){
    this.closeModal.emit();
  }

}

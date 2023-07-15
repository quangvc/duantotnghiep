import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { RegionsService } from 'src/app/module/_mShared/service/regions.service';

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
          console.log(res);
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
      let create = this.regionService.createRegion(this.formRegion.value);
      // let update = this.regionService.updateRegion(this.region.id, this.formRegion.value);

      let createUpdate = create;
      createUpdate.subscribe({
        next: (res) => {
          this.closeModal.emit();
          this.message.create(SUCCESS, `This is a message of ${SUCCESS}`);
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

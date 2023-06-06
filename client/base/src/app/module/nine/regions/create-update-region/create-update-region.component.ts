import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionsService } from 'src/app/module/_mShared/service/regions.service';

@Component({
  selector: 'create-update-region',
  templateUrl: './create-update-region.component.html'
})
export class CreateUpdateRegionComponent implements OnInit {

  @Input() displayCreateUpdateRegion: boolean = false;
  @Input() region: any;

  @Output() closeModal = new EventEmitter<any>();

  formRegion!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private regionService: RegionsService
  ) { }

  ngOnInit() {
    this.formBuilderRegion();
    this.getValueRegion();
  }

  private formBuilderRegion(){
    this.formRegion = this.fb.group({
      name: [null, Validators.required],
      status: [-1]
    })
  }

  getValueRegion(){

    if(this.region){
      this.formRegion.patchValue(this.region);

    }
  }

  handleOk(){
    if(this.formRegion.valid){

      let create = this.regionService.createRegion(this.formRegion.value);
      let update = this.regionService.updateRegion(this.region.id, this.formRegion.value);

      let createUpdate = this.region ? update : create;
      createUpdate.subscribe(
        (res) => {
          this.closeModal.emit();
        }
      )
    }
  }

  handleCancel(){
    this.closeModal.emit();
  }

}

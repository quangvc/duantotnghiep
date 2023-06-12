import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
import { RegionsService } from 'src/app/module/_mShared/service/regions.service';

@Component({
  selector: 'create-update-hotel',
  templateUrl: './create-update-hotel.component.html'
})
export class AddHotelComponent implements OnInit {

  @Input() hotel: any;
  @Input() displayCreateUpdateHotel: boolean = false;
  @Output() closeModal = new EventEmitter<any>();

  formHotel!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private regionsService: RegionsService,
    private hotelsService: HotelsService
  ) { }

  regionOptions: any[] = [];

  ngOnInit() {
    this.createFormBuildHotel();
    this.getRegion();
  }

  private createFormBuildHotel(){
    this.formHotel = this.fb.group({
      id: Math.floor(Math.random() * 999999),
      name: [null, Validators.required],
      address: [null, Validators.required],
      hotel_phone: [null, Validators.required],
      region_id: [, Validators.required],
      star_rating: [null],
      description: [null],
      status: [-1]
    })
  }

  getRegion(){
    this.regionsService.getRegion().subscribe((res) => {
      this.regionOptions = res;
    })
  }

  getValueFormUpdate(){
    if(this.hotel){
      this.formHotel.patchValue(this.hotel);
    }
  }

  handleOk(){
    if(this.formHotel.valid){
      let create = this.hotelsService.createHotel(this.formHotel.value);
      let update;
      if(this.hotel){
        update = this.hotelsService.updateHotel(this.hotel.id,this.formHotel.value);
      }

      let createUpdate = this.hotel ? update : create;
      createUpdate?.subscribe((res) => {
        this.closeModal.emit();
      })

    }
  }

  handleCancel(){
    this.closeModal.emit();
  }
}

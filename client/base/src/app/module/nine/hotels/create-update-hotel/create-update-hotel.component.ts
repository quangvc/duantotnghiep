import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
import { RegionsService } from 'src/app/module/_mShared/service/regions.service';

@Component({
  selector: 'create-update-hotel',
  templateUrl: './create-update-hotel.component.html'
})
export class AddHotelComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  @Input() hotel: any;
  @Input() displayCreateUpdateHotel: boolean = false;
  @Output() closeModal = new EventEmitter<any>();

  formHotel!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private regionsService: RegionsService,
    private hotelsService: HotelsService,
    private message: NzMessageService
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
    let obs = this.regionsService.getRegions().subscribe({
      next: (res) => {
        this.regionOptions = res;
      },
      error: (err) => {
        this.message.create(ERROR, err)
      }
    })

    this.subscription.add(obs);
  }

  getValueFormUpdate(){
    if(this.hotel){
      this.formHotel.patchValue(this.hotel);
    }
  }

  handleOk(){
    if(this.formHotel.valid){
      let create = this.hotelsService.createHotel(this.formHotel.value);
      // let update;
      // if(this.hotel){
      //   update = this.hotelsService.updateHotel(this.hotel.id,this.formHotel.value);
      // }

      let createUpdate = create;
      createUpdate.subscribe({
        next: (res) => {
          this.closeModal.emit();
          this.message.create(SUCCESS, `This is a message of ${SUCCESS}`);
        },
        error: (err) => {
          this.message.create(ERROR, err.message);
        }
      })

    }
  }

  handleCancel(){
    this.closeModal.emit();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}

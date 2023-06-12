import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomTypeService } from 'src/app/module/_mShared/service/room_type.service';

@Component({
  selector: 'create-update-room-type',
  templateUrl: './create-update-room-type.component.html'
})
export class CreateUpdateRoomTypeComponent implements OnInit {

  @Input() roomType: any;
  @Input() displayCreateUpdateRoomType: boolean = false;
  @Output() closeModal = new EventEmitter<any>();

  formRoomType!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roomTypeService: RoomTypeService
  ) { }

  ngOnInit() {
    this.createFormBuildRoomType();
    this.getRoomTypeUpdate();
  }

  private createFormBuildRoomType(){
    this.formRoomType = this.fb.group({
      name: [null, Validators.required],
      price_per_night: [null, Validators.required],
      capacity: [null, Validators.required],
      description: []
    })
  }

  getRoomTypeUpdate(){
    if(this.roomType){
      this.formRoomType.patchValue(this.roomType)
    }

  }

  handleOk(){
    if(this.formRoomType.valid){
      let data = {
        ...this.formRoomType.value,
        id: Math.floor(Math.random() * 999999)
      }
      let create = this.roomTypeService.createRoomType(data);
      let update = this.roomTypeService.createRoomType(data);

      if(this.roomType){
        update = this.roomTypeService.updateRoomType(this.roomType.id,data);
      }

      let createUpdate = this.roomType ? update : create;

      createUpdate.subscribe((res) => {
        this.closeModal.emit();
      })
    }
  }

  handleCancel(){
    this.closeModal.emit();
  }

}

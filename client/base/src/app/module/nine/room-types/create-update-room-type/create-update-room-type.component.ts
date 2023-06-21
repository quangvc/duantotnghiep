import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, firstValueFrom } from 'rxjs';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { RoomTypeService } from 'src/app/module/_mShared/service/room_type.service';

@Component({
  selector: 'create-update-room-type',
  templateUrl: './create-update-room-type.component.html'
})
export class CreateUpdateRoomTypeComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  @Input() roomType: any;
  @Input() displayCreateUpdateRoomType: boolean = false;
  @Output() closeModal = new EventEmitter<any>();

  formRoomType!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roomTypeService: RoomTypeService,
    private message: NzMessageService
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

  async handleOk(){
    if(this.formRoomType.valid){
      let create = this.roomTypeService.createRoomType(this.formRoomType.value);
      let createUpdate = create;
      let obs = await createUpdate.subscribe({
        next: (res) => {
          this.closeModal.emit();
          this.message.create(SUCCESS, `This is a message of ${SUCCESS}`);
        },
        error: (err) => {
          this.message.create(ERROR, err.message);
        }
      })
      this.subscription.add(obs)
    }
  }

  handleCancel(){
    this.closeModal.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

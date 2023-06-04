import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'create-update-room-type',
  templateUrl: './create-update-room-type.component.html'
})
export class CreateUpdateRoomTypeComponent implements OnInit {

  @Input() displayCreateUpdateRoomType: boolean = false;
  @Output() closeModal = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  handleCancel(){
    this.closeModal.emit();
  }

  handleOk(){

  }

}

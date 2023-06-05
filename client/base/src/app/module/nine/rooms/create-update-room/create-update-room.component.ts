import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'create-update-room',
  templateUrl: './create-update-room.component.html'
})
export class CreateUpdateRoomComponent implements OnInit {

  @Input() displayCreateUpdateRoom: boolean = false;
  @Output() closeModal = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  handleOk(){

  }

  handleCancel(){
    this.closeModal.emit();
  }

}

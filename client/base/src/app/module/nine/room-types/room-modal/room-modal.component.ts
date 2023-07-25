import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'room-modal',
  templateUrl: './room-modal.component.html',
  styleUrls: ['./room-modal.component.scss']
})
export class RoomModalComponent implements OnInit {

  @Input() displayRoom: boolean
  @Input() room: any[] = [];
  @Output() closeModal = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    console.log(this.room);
  }

  handleCancel(){
    this.closeModal.emit();
  }

}

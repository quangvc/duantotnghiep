import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'create-update-hotel',
  templateUrl: './create-update-hotel.component.html'
})
export class AddHotelComponent implements OnInit {

  @Input() displayCreateUpdateHotel: boolean = false;
  @Output() closeModal = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  }

  handleCancel(){
    this.closeModal.emit();
  }

  handleOk(){

  }
}

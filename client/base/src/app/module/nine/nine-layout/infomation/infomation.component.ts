import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Auth } from 'src/app/auth/_aShared/auth.class';

@Component({
  selector: 'infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.scss']
})
export class InfomationComponent implements OnInit {

  @Input() displayInf: boolean;
  @Output() closeModal = new EventEmitter<any>();

  auth = Auth.User('user');

  constructor() { }

  ngOnInit() {
    console.log(this.auth)
  }

  handleOk(){

  }

  handleCancel(){
    this.closeModal.emit();
  }

}

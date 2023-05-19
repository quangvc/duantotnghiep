import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDto } from 'src/app/module/_mShared/model/userDto.class';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {

  @Input() isVisibleUser: boolean = false;
  @Input() user: any;
  @Output() submitUser: EventEmitter<any> = new EventEmitter();
  @Output() closeUser: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.user);
  }

  cancel(){
    this.closeUser.emit();
  }

  save(){
    this.submitUser.emit();
  }

}

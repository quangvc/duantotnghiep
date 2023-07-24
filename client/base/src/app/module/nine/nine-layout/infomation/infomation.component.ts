import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router,) { }

  ngOnInit() {}

  handleOk(){
    this.router.navigate(['nine/account']);
    this.closeModal.emit();
  }

  handleCancel(){
    this.closeModal.emit();
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @Input() displayForgotPassword: boolean;

  constructor() { }

  current = 0;

  ngOnInit() {
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    console.log('done');
  }

  handleOk(){

  }

  handleCancel(){

  }

}

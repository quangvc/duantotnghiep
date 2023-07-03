import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent implements OnInit {

  @Input() profileForm!: FormGroup;

  @Input() key: string;

  @Input() check: string;

  @Input() msg: string;

  constructor() { }

  ngOnInit() {
  }


}

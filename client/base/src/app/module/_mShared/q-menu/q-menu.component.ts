import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { MenuItem } from '../model/menuItem.class';

@Component({
  selector: 'q-menu',
  templateUrl: './q-menu.component.html',
  styleUrls: ['./q-menu.component.scss']
})
export class QMenuComponent implements OnInit {

  @Input() model: MenuItem[] = [];
  @Output() buttonItem: EventEmitter<any> = new EventEmitter();

  constructor() { }

  size: NzButtonSize = 'large';

  data:any;

  ngOnInit() {

  }

  onItemClick(event:any, item:any){
    if (item.command) {
      item.command({
          originalEvent: event,
          item: item
      });
    }
  }

  dropdownItemsButton(data:any) {
    this.model = this.model;
    this.buttonItem.emit(data);
  }


}

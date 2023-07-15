import { Component } from '@angular/core';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  showButton2: boolean = false;
  showViewDiv: boolean = true;
  showEditDiv: boolean = false;
  showDiv() {
    this.showViewDiv = false;
    this.showEditDiv = true;
    this.showButton2 = true;
  }

  hideDiv() {
    this.showViewDiv = true;
    this.showEditDiv = false;
    this.showButton2 = false;
  }
}

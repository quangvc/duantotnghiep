import { Component, OnInit } from '@angular/core';
import { HotelClientService } from '../../services/hotelClient.service';
import { RegionsClientService } from '../../services/regions-client.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthClientService } from '../../services/auth-client.service';
import { Subscription } from 'rxjs';
import { ERROR } from 'src/app/module/_mShared/model/url.class';

@Component({
  selector: 'main-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  countUsers: any;
  countHotels: any;
  countRegions: any;
  private subscription = new Subscription();
  constructor(
    private HotelClientService: HotelClientService,
    private RegionsClientService: RegionsClientService,
    private message: NzMessageService,
    private AuthClientService: AuthClientService,
  ) {}
  ngOnInit(): void {
    this.getHotels();
    this.getRegions();
    this.getUsers();
  }
  getRegions() {
    let obs = this.RegionsClientService.getRegions().subscribe({
      next: (res) => {
        this.countRegions = res.data.length;
        // const limitedData = res.data.property.slice(0, 2);
        // this.regions = limitedData
        // this.getImage();
      },
      error: (err) => {
        {
          this.message.create(ERROR, err.message);
        }
      }
    })
    this.subscription.add(obs);
  }

  getHotels() {
    let obs = this.HotelClientService.getHotels().subscribe({
      next: (res) => {
        this.countHotels = res.data.length;
      },
      error: (err) => {
        {
          this.message.create(ERROR, err.message);
        }
      }
    })
    this.subscription.add(obs);
  }

  getUsers() {
    let obs = this.AuthClientService.getUsers().subscribe({
      next: (res) => {
        this.countUsers = res.data.length;
        console.log(this.countUsers);

      },
      error: (err) => {
        {
          this.message.create(ERROR, err.message);
        }
      }
    })
    this.subscription.add(obs);
  }
}

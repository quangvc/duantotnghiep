import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { BannersClientService } from 'src/app/main/services/banners-client.service';
import { ERROR } from 'src/app/module/_mShared/model/url.class';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  private subscription = new Subscription();
  // formBanner: FormGroup

  constructor(
    private BannersClientService: BannersClientService,
    private message: NzMessageService,
    ) { }


  banners: any[] = [];
  banner:any

  ngOnInit() {
    this.getBanners();
  }
  getBanners(){
    let obs = this.BannersClientService.getBanners().subscribe({
      next: (res) => {
        this.banners = res.data;
        console.log(res)
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })

    this.subscription.add(obs);
  }

}

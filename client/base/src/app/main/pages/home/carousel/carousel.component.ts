import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { BannersClientService } from 'src/app/main/services/banners-client.service';
import { ERROR } from 'src/app/module/_mShared/model/url.class';

interface Banner {
  image?:string;
}
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  loading: boolean = true;
  private subscription = new Subscription();
  banner:any

  ngOnInit() {
    this.getBanners();
  }


  banners: Banner[];

	responsiveOptions;

	constructor(private BannersClientService: BannersClientService,private message: NzMessageService,) {
		this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
	}
  getBanners() {
    let obs = this.BannersClientService.getBanners().subscribe({
      next: (res) => {
        this.banners = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
        this.loading = false;
      },
    });

    this.subscription.add(obs);
  }
}

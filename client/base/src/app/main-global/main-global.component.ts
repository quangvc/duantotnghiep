import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-global',
  templateUrl: './main-global.component.html',
  styleUrls: ['./main-global.component.scss']
})

export class MainGlobalComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    window.addEventListener('scroll', () => {
      const goTopButton = document.querySelector('.go-top-button');
      if (goTopButton) {
        if (window.scrollY > 300) {
          goTopButton.classList.add('show');
        } else {
          goTopButton.classList.remove('show');
        }
      }
    });
  }


  goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

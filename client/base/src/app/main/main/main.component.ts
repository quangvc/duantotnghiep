import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

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

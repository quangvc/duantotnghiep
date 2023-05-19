import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quyet-test';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('vn');
    translate.use('vn');
  }
}

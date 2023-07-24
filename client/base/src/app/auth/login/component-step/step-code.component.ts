import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'step-code',
  template: `
    <form >
      <div class="row">

        <div class="col-12">
          <div class="mb-3">
            <input type="number" class="form-control" id="name" placeholder="Vui lòng nhập mã code" autofocus>
            <small>Mã code được gửi vào trong hòm thư của bạn</small>
          </div>
        </div>

      </div>
    </form>
  `,
})
export class StepCodeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

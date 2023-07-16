import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'step-password',
  template: `
    <form >
      <div class="row">

        <div class="col-12">
          <div class="mb-3">
            <input type="number" class="form-control" placeholder="Nhập mật khẩu mới" autofocus>
          </div>
        </div>

        <div class="col-12">
          <div class="mb-3">
            <input type="number" class="form-control" placeholder="Nhập lại mật khẩu" autofocus>
          </div>
        </div>

      </div>
    </form>
  `,
})
export class StepPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

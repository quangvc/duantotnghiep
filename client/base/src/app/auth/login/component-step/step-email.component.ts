import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'step-email',
  template: `
    <form >
      <div class="row">

        <div class="col-12">
          <div class="mb-3">
            <input type="email" class="form-control" id="name" placeholder="Vui lòng nhập email" autofocus>
          </div>
        </div>

      </div>
    </form>
  `,
})
export class StepEmailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

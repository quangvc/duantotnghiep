import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDoneComponent } from './payment-done.component';

describe('PaymentDoneComponent', () => {
  let component: PaymentDoneComponent;
  let fixture: ComponentFixture<PaymentDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

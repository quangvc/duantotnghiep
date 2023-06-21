import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelPolicyComponent } from './hotel-policy.component';

describe('HotelPolicyComponent', () => {
  let component: HotelPolicyComponent;
  let fixture: ComponentFixture<HotelPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

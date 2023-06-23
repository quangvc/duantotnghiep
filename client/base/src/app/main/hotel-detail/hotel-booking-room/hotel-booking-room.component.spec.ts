import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBookingRoomComponent } from './hotel-booking-room.component';

describe('HotelBookingRoomComponent', () => {
  let component: HotelBookingRoomComponent;
  let fixture: ComponentFixture<HotelBookingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelBookingRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelBookingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';
import { RoomRoutes } from './room.routing';

@NgModule({
  imports: [
    CommonModule,
    RoomRoutes
  ],
  declarations: [RoomComponent]
})
export class RoomModule { }

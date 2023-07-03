import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { TeamRoutes } from './team.routing';

@NgModule({
  imports: [
    CommonModule,
    TeamRoutes
  ],
  declarations: [TeamComponent]
})
export class TeamModule { }

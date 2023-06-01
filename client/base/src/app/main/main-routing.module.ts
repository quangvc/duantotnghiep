import { NgModule } from "@angular/core";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { AboutComponent } from './about/about.component';
import { BookingComponent } from './booking/booking.component';
import { ContractComponent } from './contract/contract.component';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { ServiceComponent } from './service/service.component';
import { TeamComponent } from './team/team.component';

@NgModule({
    imports: [
        // RouterModule.forChild([
        //     {
        //         path: "main",
        //         children: [
        //             { path: "home", component: HomeComponent },
        //             { path: 'booking', component: BookingComponent},
        //             { path: 'about', component: AboutComponent},
        //             { path: 'contract', component: ContractComponent},
        //             { path: "room", component: RoomComponent },
        //             { path: "service", component: ServiceComponent },
        //             { path: "team", component: TeamComponent },
        //         ],
        //     },
        // ]),
    ],
    exports: [RouterModule],
})
export class MainRoutingModule {
    constructor(private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scroll(0, 0);
            }
        });
    }
}

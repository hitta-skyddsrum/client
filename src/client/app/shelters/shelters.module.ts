import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheltersComponent } from './shelters.component';
import { SheltersRoutingModule } from './shelters-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from '../shared/api/api.service';
import {GeolocationService} from "../shared/geolocation/geolocation.service";

@NgModule({
    imports: [CommonModule, SheltersRoutingModule, SharedModule],
    declarations: [SheltersComponent],
    exports: [SheltersComponent],
    providers: [ApiService, GeolocationService]
})
export class SheltersModule { }

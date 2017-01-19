import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SheltersComponent} from './shelters.component';
import {SheltersRoutingModule} from './shelters-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ApiService} from '../shared/api/api.service';
import {GeolocationService} from "../shared/geolocation/geolocation.service";
import {SheltersMapComponent} from "./map/shelters.map.component";
import {SheltersInfoBoxComponent} from "./info-box/shelters.info-box.component";
import {SheltersInfoBoxStep1Component} from "./info-box/step1/shelters.info-box.step1.component";
import {SheltersConsumerLocatorComponent} from "./consumer-locator/shelters.consumer-locator.component";
import {SheltersUserStateService} from "./user-state/shelters.user-state.service";
import {SheltersListComponent} from "./list/shelters.list.component";

@NgModule({
  imports: [CommonModule, SheltersRoutingModule, SharedModule],
  declarations: [
    SheltersComponent,
    SheltersListComponent,
    SheltersMapComponent,
    SheltersInfoBoxComponent,
    SheltersInfoBoxStep1Component,
    SheltersConsumerLocatorComponent,
  ],
  exports: [
    SheltersComponent,
    SheltersMapComponent,
    SheltersInfoBoxComponent,
    SheltersInfoBoxStep1Component,
    SheltersListComponent
  ],
  providers: [ApiService, GeolocationService, SheltersUserStateService]
})
export class SheltersModule {
}

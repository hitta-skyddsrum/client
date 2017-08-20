import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheltersComponent } from './shelters.component';
import { SheltersRoutingModule } from './shelters-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from '../shared/api/api.service';
import { GeolocationService } from '../shared/geolocation/geolocation.service';
import { SheltersMapComponent } from './map/shelters.map.component';
import { SheltersInfoBoxComponent } from './info-box/shelters.info-box.component';
import { SheltersInfoBoxStep2Component } from './info-box/step2/shelters.info-box.step2.component';
import { SearchByAddressComponent } from '../components/search-by-address/search-by-address.component';
import { SheltersUserStateService } from './user-state/shelters.user-state.service';
import { SheltersInfoBoxStep3Component } from './info-box/step3/shelters.info-box.step3.component';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { SheltersListResolver } from '../pages/shelters-list/shelters.list.resolver';
// tslint:disable-next-line
import { SheltersDetailShelterResolver } from '../pages/shelters-detail/shelters.detail.shelter.resolver';
// tslint:disable-next-line
import { SheltersDetailHospitalResolver } from '../pages/shelters-detail/shelters.detail.hospitals.resolver';
import { SheltersInfoBoxStep1Component } from './info-box/step1/shelters.info-box.step1.component';
import { SheltersInfoBoxStep4Component } from './info-box/step4/shelters.info-box.step4.component';
import { MaterialModule } from '@angular/material';
import { WindowRefService } from 'app/shelters/window-ref.services';

@NgModule({
  imports: [
    CommonModule,
    SheltersRoutingModule,
    SharedModule,
    ShareButtonsModule,
    MaterialModule,
  ],
  declarations: [
    SheltersComponent,
    SheltersMapComponent,
    SheltersInfoBoxComponent,
    SheltersInfoBoxStep2Component,
    SheltersInfoBoxStep1Component,
    SheltersInfoBoxStep3Component,
    SheltersInfoBoxStep4Component,
    SearchByAddressComponent,
  ],
  exports: [
    SheltersComponent,
    SheltersMapComponent,
    SheltersInfoBoxComponent,
    SheltersInfoBoxStep2Component,
    SearchByAddressComponent,
  ],
  providers: [
    ApiService,
    GeolocationService,
    SheltersUserStateService,
    SheltersListResolver,
    SheltersDetailShelterResolver,
    SheltersDetailHospitalResolver,
    WindowRefService,
  ]
})
export class SheltersModule {
}

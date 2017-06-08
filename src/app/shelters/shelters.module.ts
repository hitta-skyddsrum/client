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
import { SearchBoxComponent } from './search/search-box/search-box.component';
import { SheltersUserStateService } from './user-state/shelters.user-state.service';
import { SheltersListComponent } from './list/shelters.list.component';
import { SheltersDetailComponent } from './detail/shelters.detail.component';
import { SheltersInfoBoxStep3Component } from './info-box/step3/shelters.info-box.step3.component';
import { ShareButtonsModule } from 'ng2-sharebuttons';
import { SheltersListResolver } from './list/shelters.list.resolver';
import { SheltersDetailShelterResolver } from './detail/shelters.detail.shelter.resolver';
import { SheltersDetailHospitalResolver } from './detail/shelters.detail.hospitals.resolver';
import { SheltersInfoBoxStep1Component } from './info-box/step1/shelters.info-box.step1.component';
import { SheltersInfoBoxStep4Component } from './info-box/step4/shelters.info-box.step4.component';
import { SearchPageComponent } from 'app/shelters/search/search-page/search-page.component';
import { MdButtonModule, MdIconModule } from '@angular/material';
import { NguiMapModule } from '@ngui/map';
import { GooglePlaceModule } from 'angular2-google-map-auto-complete/directives';

@NgModule({
  imports: [
    CommonModule,
    SheltersRoutingModule,
    SharedModule,
    ShareButtonsModule,
    MdIconModule,
    MdButtonModule,
    NguiMapModule.forRoot({apiUrl: '//maps.google.com/maps/api/js?libraries=places&key=AIzaSyAN8-fiUVNDslX11X-iIkPVBxmBHEOmWn4'}),
    GooglePlaceModule,
  ],
  declarations: [
    SheltersComponent,
    SheltersListComponent,
    SheltersMapComponent,
    SheltersInfoBoxComponent,
    SheltersInfoBoxStep2Component,
    SheltersInfoBoxStep1Component,
    SheltersInfoBoxStep3Component,
    SheltersInfoBoxStep4Component,
    SearchBoxComponent,
    SheltersDetailComponent,
    SearchPageComponent,
  ],
  exports: [
    SheltersComponent,
    SearchPageComponent,
    SheltersMapComponent,
    SheltersInfoBoxComponent,
    SheltersInfoBoxStep2Component,
    SheltersListComponent
  ],
  providers: [
    ApiService,
    GeolocationService,
    SheltersUserStateService,
    SheltersListResolver,
    SheltersDetailShelterResolver,
    SheltersDetailHospitalResolver,
  ]
})
export class SheltersModule {
}

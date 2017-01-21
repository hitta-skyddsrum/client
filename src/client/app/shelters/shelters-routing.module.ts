import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SheltersListComponent} from './list/shelters.list.component';
import {SheltersInfoBoxStep1Component} from './info-box/step1/shelters.info-box.step1.component';
import {SheltersConsumerLocatorComponent} from "./consumer-locator/shelters.consumer-locator.component";
import {SheltersDetailComponent} from "./detail/shelters.detail.component";
import {SheltersInfoBoxStep2Component} from "./info-box/step2/shelters.info-box.step2.component";
import {SheltersInfoBoxStep3Component} from "./info-box/step3/shelters.info-box.step3.component";
import {SheltersMapComponent} from "./map/shelters.map.component";
import {SheltersComponent} from "./shelters.component";
import {SheltersInfoBoxComponent} from "./info-box/shelters.info-box.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'skyddsrum/var-ar-du',
        component: SheltersConsumerLocatorComponent
      },
      {
        path: 'skyddsrum',
        component: SheltersComponent,
        children: [
          {
            path: '',
            component: SheltersMapComponent,
            outlet: 'map',
          },
          {
            path: ':id',
            children: [
              {
                path: '',
                component: SheltersDetailComponent
              },
              {
                path: 'dela',
                outlet: 'infoBoxContent',
                component: SheltersInfoBoxStep3Component,
              },
              {
                path: '',
                outlet: 'infoBoxContent',
                component: SheltersInfoBoxStep2Component,
              },
            ]
          },
          {
            path: '',
            children: [
              {
                path: '',
                component: SheltersListComponent
              },
              {
                path: '',
                outlet: 'infoBoxContent',
                component: SheltersInfoBoxStep1Component,
              },
            ]
          },
        ]
      },
    ])
  ],
  exports: [RouterModule]
})
export class SheltersRoutingModule {
}

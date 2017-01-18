import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SheltersComponent} from './shelters.component';
import {SheltersInfoBoxStep1Component} from './info-box/step1/shelters.info-box.step1.component';
import {SheltersConsumerLocatorComponent} from "./consumer-locator/shelters.consumer-locator.component";

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
            component: SheltersInfoBoxStep1Component
          }
        ]
      },
    ])
  ],
  exports: [RouterModule]
})
export class SheltersRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SheltersListComponent} from './list/shelters.list.component';
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
        component: SheltersListComponent,
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

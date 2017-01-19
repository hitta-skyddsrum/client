import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SheltersListComponent} from './list/shelters.list.component';
import {SheltersInfoBoxStep1Component} from './info-box/step1/shelters.info-box.step1.component';
import {SheltersConsumerLocatorComponent} from "./consumer-locator/shelters.consumer-locator.component";
import {SheltersDetailComponent} from "./detail/shelters.detail.component";
import {SheltersInfoBoxStep2Component} from "./info-box/step2/shelters.info-box.step2.component";

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
      {
        path: 'skyddsrum/:id',
        component: SheltersDetailComponent,
        children: [
          {
            path: '',
            component: SheltersInfoBoxStep2Component
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class SheltersRoutingModule {
}

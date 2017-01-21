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
import {SheltersListResolver} from "./list/shelters.list.resolver";
import {SheltersDetailShelterResolver} from "./detail/shelters.detail.shelter.resolver";
import {SheltersDetailHospitalResolver} from "./detail/shelters.detail.hospitals.resolver";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'skyddsrum/var-ar-du',
        component: SheltersConsumerLocatorComponent,
        data: {
          meta: {
            title: 'Var vill du hitta närmsta skyddsrum? | Hitta skyddsrum',
          },
        },
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
                component: SheltersDetailComponent,
                resolve: {
                  shelter: SheltersDetailShelterResolver,
                  hospitals: SheltersDetailHospitalResolver,
                },
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
                component: SheltersListComponent,
                resolve: {
                  shelters: SheltersListResolver
                },
                data: {
                  meta: {
                    title: 'Visa skyddsrum | Hitta skyddsrum',
                  },
                },
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

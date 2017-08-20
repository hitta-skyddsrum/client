import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SheltersListComponent } from '../pages/shelters-list/shelters.list.component';
import { SheltersInfoBoxStep2Component } from './info-box/step2/shelters.info-box.step2.component';
import { SheltersDetailComponent } from '../pages/shelters-detail/shelters.detail.component';
import { SheltersInfoBoxStep3Component } from './info-box/step3/shelters.info-box.step3.component';
import { SheltersComponent } from './shelters.component';
import { SheltersListResolver } from '../pages/shelters-list/shelters.list.resolver';
// tslint:disable-next-line
import { SheltersDetailShelterResolver } from '../pages/shelters-detail/shelters.detail.shelter.resolver';
// tslint:disable-next-line
import { SheltersDetailHospitalResolver } from '../pages/shelters-detail/shelters.detail.hospitals.resolver';
import { SheltersInfoBoxStep1Component } from './info-box/step1/shelters.info-box.step1.component';
import { SheltersInfoBoxStep4Component } from './info-box/step4/shelters.info-box.step4.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'skyddsrum',
        component: SheltersComponent,
        children: [
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
                component: SheltersInfoBoxStep4Component,
              },
              {
                path: '',
                outlet: 'infoBoxContent',
                component: SheltersInfoBoxStep3Component,
              },
            ]
          },
          {
            path: 'koordinater/:lat/:lng',
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
                component: SheltersInfoBoxStep2Component,
              },

            ]
          },
          {
            path: '',
            pathMatch: 'full',
            outlet: 'infoBoxContent',
            component: SheltersInfoBoxStep1Component,
            data: {
              meta: {
                title: 'Var vill du hitta närmsta skyddsrum? | Hitta skyddsrum',
              },
            },
          },
        ]
      },
    ])
  ],
  exports: [RouterModule]
})
export class SheltersRoutingModule {
}

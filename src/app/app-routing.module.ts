import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AboutSheltersComponent } from './pages/about-shelters/about-shelters.component';
import { SheltersSearchComponent } from 'app/pages/shelters-search/shelters-search.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'skyddsrum/sok',
        component: SheltersSearchComponent,
      },
      {
        path: 'om-tjansten',
        component: AboutComponent,
        data: {
          meta: {
            title: 'Om Hitta skyddsrum | Hitta skyddsrum',
          }
        }
      },
      {
        path: 'vad-ar-ett-skyddsrum',
        component: AboutSheltersComponent,
        data: {
          meta: {
            title: 'Vad är ett skyddsrum? | Hitta skyddsrum',
          }
        }
      },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

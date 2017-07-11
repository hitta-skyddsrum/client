import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AboutSheltersComponent } from './about-shelters/about-shelters.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
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

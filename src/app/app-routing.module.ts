import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'om-tjansten',
        component: AboutComponent,
        data: {
          meta: {
            title: 'Om Hitta Skyddsrum | Hitta skyddsrum',
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

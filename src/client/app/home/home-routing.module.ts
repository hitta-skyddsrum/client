import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        data: {
          meta: {
            title: 'Hitta ditt närmaste skyddsrum | Hitta skyddsrum',
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

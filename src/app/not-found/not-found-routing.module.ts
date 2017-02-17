import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '**',
        redirectTo: '404'
      },
      {
        path: '404',
        component: NotFoundComponent,
        data: {
          meta: {
            title: 'Hitta rätt | Hitta skyddsrum',
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }

import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NotFoundRoutingModule,
  ],
  declarations: [ NotFoundComponent ],
  exports: [ NotFoundComponent ]
})

export class NotFoundModule {}

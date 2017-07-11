import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { ApiService } from './api/api.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { GmapsGeocoderService } from './gmaps-geocoder/gmaps-geocoder.service';
import { BouncerComponent } from './bouncer/bouncer.component';
import { ContentContainerComponent } from './content-container/content-container.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    SpinnerComponent,
    BouncerComponent,
    ContentContainerComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SpinnerComponent,
    BouncerComponent,
    ContentContainerComponent,
  ]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ApiService, GmapsGeocoderService]
    };
  }
}

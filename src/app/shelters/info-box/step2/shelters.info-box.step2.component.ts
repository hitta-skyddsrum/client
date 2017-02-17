import { Component } from '@angular/core';
import { SheltersUserStateService } from '../../user-state/shelters.user-state.service';
import { SheltersInfoBoxComponent } from '../shelters.info-box.component';
import { Router } from '@angular/router';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({

  templateUrl: 'shelters.info-box.step2.component.html',
})

export class SheltersInfoBoxStep2Component extends SheltersInfoBoxComponent {
  shelter: any;
  showBouncer: boolean;

  constructor(
    router: Router,
    sheltersUserStateService: SheltersUserStateService,
  ) {
    super(router);
    sheltersUserStateService.selectedShelter$.subscribe(shelter => this.shelter = shelter);
  }
}

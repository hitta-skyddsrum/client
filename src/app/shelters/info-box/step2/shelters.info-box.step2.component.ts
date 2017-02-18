import { Component } from '@angular/core';
import { SheltersUserStateService } from '../../user-state/shelters.user-state.service';
import { SheltersInfoBoxComponent } from '../shelters.info-box.component';
import { Router } from '@angular/router';
import { Shelter } from '../../../../models/shelter.model';

@Component({
  templateUrl: 'shelters.info-box.step2.component.html',
})

export class SheltersInfoBoxStep2Component extends SheltersInfoBoxComponent {
  public showBouncer: boolean;
  public shelter: Shelter;

  constructor(
    router: Router,
    sheltersUserStateService: SheltersUserStateService,
  ) {
    super(router);
    sheltersUserStateService.selectedShelter$
      .subscribe((shelter: Shelter) => this.shelter = shelter);
  }
}

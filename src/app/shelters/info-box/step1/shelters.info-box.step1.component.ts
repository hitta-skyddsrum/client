import { Component } from '@angular/core';
import { SheltersUserStateService } from '../../user-state/shelters.user-state.service';
import { SheltersInfoBoxComponent } from '../shelters.info-box.component';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'shelters.info-box.step1.component.html',
})

export class SheltersInfoBoxStep1Component extends SheltersInfoBoxComponent {
  constructor(
    router: Router,
    private sheltersUserStateService: SheltersUserStateService,
  ) {
    super(router);
    this.sheltersUserStateService.setCurrentStep(1);
  }
}

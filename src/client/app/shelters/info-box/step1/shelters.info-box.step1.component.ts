import {Component} from '@angular/core';
import {SheltersUserStateService} from "../../user-state/shelters.user-state.service";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  templateUrl: 'shelters.info-box.step1.component.html',
})

export class SheltersInfoBoxStep1Component {
  shelter: any;

  constructor(sheltersUserStateService: SheltersUserStateService) {
    sheltersUserStateService.selectedShelter$.subscribe(shelter => this.shelter = shelter);
  }
}
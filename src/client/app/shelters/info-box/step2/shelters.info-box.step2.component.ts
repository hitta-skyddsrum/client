import {Component, AfterContentInit} from '@angular/core';
import {SheltersUserStateService} from "../../user-state/shelters.user-state.service";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  templateUrl: 'shelters.info-box.step2.component.html',
})

export class SheltersInfoBoxStep2Component {
  shelter: any;
}
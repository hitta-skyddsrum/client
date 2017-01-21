import {Component, AfterContentInit} from '@angular/core';
import {SheltersUserStateService} from "../../user-state/shelters.user-state.service";
import {SheltersInfoBoxComponent} from "../shelters.info-box.component";
import {Router} from "@angular/router";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  templateUrl: 'shelters.info-box.step2.component.html',
})

export class SheltersInfoBoxStep2Component extends SheltersInfoBoxComponent {
  shelter: any;

  constructor(
    router: Router,
    private sheltersUserStateService: SheltersUserStateService,
  ) {
    super(router);
  }

  ngAfterViewChecked(): void {
    this.sheltersUserStateService.setCurrentStep(2);
  }
}
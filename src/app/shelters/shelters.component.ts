import { Component, Output } from '@angular/core';
import { SheltersUserStateService } from './user-state/shelters.user-state.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  templateUrl: 'shelters.component.html',
  styleUrls: ['shelters.component.scss'],

})

export class SheltersComponent {
  public currentStep: number;
  public isOpen: boolean;
  public progressBarWidth: number = 0;
  public showBouncer: boolean = false;

  constructor(
    protected sheltersUserStateService: SheltersUserStateService
  ) {

    sheltersUserStateService.currentStep$.subscribe(
      (step: number) => this.setCurrentStep(step)
    );
  }

  private setCurrentStep(step: number) {
    this.isOpen = true;
    this.currentStep = step;
    this.progressBarWidth = (step - 1) * (100 / 3);
  }
}

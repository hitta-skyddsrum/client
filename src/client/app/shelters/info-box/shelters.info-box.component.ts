import {Component, AfterContentInit, ViewChild} from '@angular/core';
import {Shelter} from '../../shared/api';
import {SheltersUserStateService} from "../user-state/shelters.user-state.service";
import {SheltersInfoBoxStep1Component} from "./step1/shelters.info-box.step1.component";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  templateUrl: 'shelters.info-box.component.html',
  styleUrls: ['shelters.info-box.component.css'],
})

export class SheltersInfoBoxComponent {
  currentStep: number;
  isOpen: boolean;
  progressBarWidth: number;
  shelter: Shelter;

  constructor(sheltersUserStateService: SheltersUserStateService) {
    sheltersUserStateService.currentStep$.subscribe(
      step => this.setCurrentStep(step)
    );
  }

  private setCurrentStep(step: number) {
    this.isOpen = true;
    this.currentStep = step;
    this.progressBarWidth = (step - 1)*100/2;
  }
}
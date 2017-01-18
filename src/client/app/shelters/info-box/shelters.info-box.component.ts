import {Component, AfterContentInit} from '@angular/core';
import {Shelter} from '../../shared/api';
import {SheltersUserStateService} from "../user-state/shelters.user-state.service";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'shelters-infoBox',
  templateUrl: 'shelters.info-box.component.html',
  styleUrls: ['shelters.info-box.component.css'],
})

export class SheltersInfoBoxComponent {
  currentStep: number;
  isOpen: boolean;
  progressBarWidth: number;
  shelter: Shelter;

  constructor(sheltersUserStateService: SheltersUserStateService) {
    sheltersUserStateService.selectedShelter$.subscribe(shelter => {
      if (shelter !== null) {
        this.shelter = shelter;
        this.setCurrentStep(1);
        this.open();
      }
    });
  }

  setCurrentStep(step: number) {
    this.currentStep = step;
    this.progressBarWidth = (step - 1)*100/2;
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
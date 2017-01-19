import {Component, AfterContentInit, ViewChild} from '@angular/core';
import {Shelter} from '../../shared/api';
import {SheltersUserStateService} from "../user-state/shelters.user-state.service";
import {SheltersInfoBoxStep1Component} from "./step1/shelters.info-box.step1.component";

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
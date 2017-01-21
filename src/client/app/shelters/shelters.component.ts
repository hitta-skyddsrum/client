import {Component, OnInit} from '@angular/core';
import {ApiService, Shelter} from '../shared/api/api.service';
import {Observable} from "rxjs/Observable";
import {SheltersUserStateService} from "./user-state/shelters.user-state.service";
import {ActivatedRoute} from "@angular/router";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'shelters.component.html',
  styleUrls: ['shelters.component.css'],
})

export class SheltersComponent {
  currentStep: number;
  isOpen: boolean;
  progressBarWidth: number;

  constructor(private sheltersUserStateService: SheltersUserStateService) {
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

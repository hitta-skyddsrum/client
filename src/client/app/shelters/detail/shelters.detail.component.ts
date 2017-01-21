import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService, Shelter, Hospital} from '../../shared/api/api.service';
import {Observable} from "rxjs/Observable";
import {SheltersUserStateService} from "../user-state/shelters.user-state.service";
import {ActivatedRoute} from "@angular/router";
import {SheltersMapComponent} from "../map/shelters.map.component";
import {SheltersInfoBoxComponent} from "../info-box/shelters.info-box.component";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: '../shelters.component.html',
  styleUrls: ['../shelters.component.css'],
})

export class SheltersDetailComponent implements OnInit {

  shelter: Shelter;
  hospitals: Hospital[];

  @ViewChild(SheltersMapComponent) sheltersMapComponent: SheltersMapComponent;
  @ViewChild(SheltersInfoBoxComponent) sheltersInfoBoxContent: SheltersInfoBoxComponent;

  /**
   * Creates an instance of the SheltersComponent with the injected
   * ApiService.
   *
   * @param {ApiService} apiService - The injected ApiService.
   */
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private sheltersUserStateService: SheltersUserStateService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.apiService.shelters().show(params).subscribe(
        (shelter: Shelter) => {
          this.sheltersUserStateService.setShelters([shelter]);
          this.sheltersUserStateService.selectShelter(shelter);
        }
      );

      this.apiService.shelters().showHospitals(params).subscribe(
        (hospitals: Hospital[]) => {
          this.sheltersUserStateService.setHospitals(hospitals);
          this.sheltersUserStateService.selectHospital(hospitals[0]);
        }
      );
    });

    this.sheltersUserStateService.selectedHospital$.subscribe(
      () => this.sheltersUserStateService.setCurrentStep(2)
    );
  }

  ngAfterContentInit() {
  }
}
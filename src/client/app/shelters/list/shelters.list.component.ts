import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService, Shelter, Position} from '../../shared/api/api.service';
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
})

export class SheltersListComponent implements OnInit {

  shelters: Shelter[] = [];

  @ViewChild(SheltersMapComponent) sheltersMapComponent: SheltersMapComponent;
  @ViewChild(SheltersInfoBoxComponent) sheltersInfoBoxComponent: SheltersInfoBoxComponent;

  /**
   * Creates an instance of the SheltersComponent with the injected
   * ApiService.
   *
   * @param {ApiService} apiService - The injected ApiService.
   */
  constructor(
    private route: ActivatedRoute,
    private sheltersUserStateService: SheltersUserStateService
  ) {}

  ngOnInit() {
    let position: Position = <Position> {
      lat: this.route.snapshot.queryParams['lat'],
      long: this.route.snapshot.queryParams['lng']
    };
    
    this.sheltersUserStateService.setPosition(position);

    // Clean the map on init
    this.sheltersUserStateService.setHospitals([]);
//    this.sheltersUserStateService.setShelters([]);


    this.sheltersUserStateService.setShelters(
      this.route.snapshot.data['shelters']
    );

    this.sheltersUserStateService.shelters$.subscribe(
      (shelters: Shelter[]) => this.sheltersUserStateService.selectShelter(shelters[0])
    ).unsubscribe();

    this.sheltersUserStateService.selectedShelter$.subscribe(
      (shelter: Shelter) => {
        this.sheltersUserStateService.setCurrentStep(1);
      }
    ).unsubscribe();
  }
}

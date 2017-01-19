import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService, Shelter, Position} from '../../shared/api/api.service';
import {SheltersUserStateService} from "../user-state/shelters.user-state.service";
import {ActivatedRoute} from "@angular/router";
import {SheltersComponent} from "../shelters.component";
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

export class SheltersListComponent extends SheltersComponent implements OnInit {

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
    private apiService: ApiService,
    private route: ActivatedRoute,
    private sheltersUserStateService: SheltersUserStateService
  ) {
    super();
  }

  /**
   * Get the shelters OnInit
   */
  ngOnInit() {
    let lat: number = this.route.snapshot.queryParams['lat'];
    let lng: number = this.route.snapshot.queryParams['lng'];
    let position: Position = <Position> {
      lat: lat,
      long: lng
    };

    this.sheltersUserStateService.setPosition(position);

    this.apiService.getShelters(position).subscribe(
        (shelters: Shelter[]) => this.sheltersUserStateService.setShelters(shelters)
      );

    this.sheltersMapComponent.whenSheltersIsPlotted$.subscribe(
      (result: boolean) => this.sheltersMapComponent.selectClosestShelter(position)
    );

    this.sheltersUserStateService.selectedShelter$.subscribe(
      (shelter: Shelter) => {
        this.sheltersInfoBoxComponent.shelter = shelter;
        this.sheltersInfoBoxComponent.open();
        this.sheltersInfoBoxComponent.setCurrentStep(1);
      }
    )
  }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService, Shelter} from '../../shared/api/api.service';
import {SheltersUserStateService} from "../user-state/shelters.user-state.service";
import {ActivatedRoute} from "@angular/router";
import {SheltersComponent} from "../shelters.component";
import {SheltersMapComponent} from "../map/shelters.map.component";

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
    let coords: Coordinates = <Coordinates> {
      latitude: lat,
      longitude: lng,
      accuracy: 1,
      altitude: null,
      altitudeAccuracy: 1,
      heading: null
    };
    let location: Position = <Position> {
      coords: coords
    };

    this.sheltersUserStateService.setPosition(location);

    this.apiService.getShelters(coords).subscribe(
        (shelters: Shelter[]) => this.sheltersUserStateService.setShelters(shelters)
      );

    this.sheltersUserStateService.whenSheltersIsPlotted$.subscribe(
      (result: boolean) => this.sheltersMapComponent.selectClosestShelter(location)
    );
  }

}

import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService, Shelter} from '../shared/api/api.service';
import {Observable} from "rxjs/Observable";
import {SheltersMapComponent} from './map/shelters.map.component';
import {SheltersInfoBoxComponent} from "./info-box/shelters.info-box.component";
import {Observer} from "rxjs";
import {SheltersUserStateService} from "./user-state/shelters.user-state.service";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'shelters.component.html',
  styleUrls: ['shelters.component.css'],
})

export class SheltersComponent implements OnInit {

  shelters: Shelter[] = [];

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
  }

  getShelters(coordinates: Coordinates) {
    return Observable.create((observer: any) => {
      this.apiService.getShelters(coordinates)
        .subscribe(
          shelters => {
            this.shelters = shelters;
            observer.next();
          }
        );
    })
  }

}

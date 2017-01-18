import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService, Shelter} from '../shared/api/api.service';
import {GeolocationService} from '../shared/geolocation/geolocation.service';
import {Observable} from "rxjs/Observable";
import {SheltersMapComponent} from './map/shelters.map.component';
import {SheltersInfoBoxComponent} from "./info-box/shelters.info-box.component";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'shelters.component.html',
  styleUrls: ['shelters.component.css'],
})
export class SheltersComponent implements AfterViewInit {

  shelters: Shelter[] = [];
  currentPosition: Coordinates;

  @ViewChild(SheltersMapComponent) sheltersMapComponent = SheltersMapComponent;
  @ViewChild(SheltersInfoBoxComponent) sheltersInfoBoxComponent = SheltersInfoBoxComponent;

  /**
   * Creates an instance of the SheltersComponent with the injected
   * ApiService.
   *
   * @param {ApiService} apiService - The injected ApiService.
   */
  constructor(
    public apiService: ApiService,
    public geoLocation: GeolocationService,
    public router: Router) {
  }

  /**
   * Get the shelters OnInit
   */
  ngAfterViewInit() {
    this.getPosition().subscribe(location => {
      this.currentPosition = location.coords;
      this.sheltersMapComponent.writeMap(location.coords);
      this.router.navigate()
      this.getShelters(location.coords).subscribe(
        result => {
          this.sheltersMapComponent.plotShelters(this.shelters);
          this.sheltersInfoBoxComponent.open();
          this.sheltersInfoBoxComponent.setCurrentStep(1);
        }
      );
    });

  }

  getPosition() {
    return this.geoLocation.getLocation({});
  }

  /**
   * Handle the apiService observable
   */
  getShelters(coordinates: Coordinates) {
    return Observable.create(observer => {
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

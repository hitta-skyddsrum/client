import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api/api.service';
import {GeolocationService} from '../shared/geolocation/geolocation.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-shelters',
  templateUrl: 'shelters.component.html',
  styleUrls: ['shelters.component.css'],
})
export class SheltersComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  shelters: any[] = [];

  /**
   * Creates an instance of the SheltersComponent with the injected
   * ApiService.
   *
   * @param {ApiService} apiService - The injected ApiService.
   */
  constructor(public apiService: ApiService, public geoLocation: GeolocationService) {
  }

  /**
   * Get the shelters OnInit
   */
  ngOnInit() {
    this.getPosition().subscribe(result => {
      console.log(result);
      this.getShelters();
    });
  }

  getPosition(coordinates: Coordinates) {
    return this.geoLocation.getLocation({});
  }

  /**
   * Handle the apiService observable
   */
  getShelters() {
    this.apiService.getShelters()
      .subscribe(
        shelters => this.shelters = shelters,
        error => this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement apiService.post
    this.shelters.push(this.newName);
    this.newName = '';
    return false;
  }

}

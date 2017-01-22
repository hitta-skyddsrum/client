import {Component, AfterContentInit, AfterViewInit, Output, NgZone, Input} from '@angular/core';
import {GeolocationService} from '../../shared/geolocation/geolocation.service';
import {ActivatedRoute, Router, NavigationExtras} from "@angular/router";
import {Observable} from "rxjs";
import {GmapsGeocoderService} from "../../shared/gmaps-geocoder/gmaps-geocoder.service";

declare var google: any;

@Component({
  moduleId: module.id,
  templateUrl: 'shelters.consumer-locator.component.html',
  styleUrls: ['shelters.consumer-locator.component.css'],
})

export class SheltersConsumerLocatorComponent implements AfterViewInit {

  private gmapsGeocoder: any;
  addressSuggestions: any[];
  showBouncer: boolean;
  searchQuery: string;
  searchTimeout: any;

  constructor (
    private zone: NgZone,
    private geoLocation: GeolocationService,
    private gmapsGeocoderService: GmapsGeocoderService
  ) {

  }

  ngAfterViewInit() {
    this.gmapsGeocoder = new google.maps.Geocoder();
    this.displayBouncer(true);
    this.getPosition().subscribe(
      (position: Position) => {
        console.log(position);

        let navigationExtras: NavigationExtras = {
          queryParams: {
            'lat': position.coords.latitude.valueOf(),
            'lng': position.coords.longitude.valueOf()
          }
        };

        this.lookupPosition(position);
      },
      () => {
        this.displayBouncer(false);
      },
      () => {
        this.displayBouncer(false);
      }
    );
  }

  private lookupPosition(position: Position) {
    this.displayBouncer(true);

    this.gmapsGeocoderService.lookupPosition(position).subscribe(
      (results: any[]) => {
        this.displayBouncer(false);
        this.zone.run(() => this.addressSuggestions = results);
      },
      () => this.displayBouncer(false),
      () => this.displayBouncer(false),
    )
  }

  private getPosition() {
    return this.geoLocation.getLocation({});
  }

  lookupAddress(address: string) {
    if (typeof address === 'undefined' || address.length < 4) {
      return;
    }

    console.log('address', address);
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
        this.displayBouncer(true);
        this.gmapsGeocoderService.lookupAddress(address).subscribe(
          (result: any[]) => {
            console.log('resultat: ', result[0].formatted_address);
            this.displayBouncer(false);
            this.addressSuggestions = result;
          },
          () => this.displayBouncer(false),
          () => this.displayBouncer(false),
        )
    }, 50);

  }

  private displayBouncer(value: boolean) {
    this.showBouncer = value;
  }

}
import {Component, AfterContentInit, AfterViewInit, Output, NgZone, Input} from '@angular/core';
import {GeolocationService} from '../../shared/geolocation/geolocation.service';
import {ActivatedRoute, Router, NavigationExtras} from "@angular/router";
import {Observable} from "rxjs";

declare var google: any;

@Component({
  moduleId: module.id,
  templateUrl: 'shelters.consumer-locator.component.html',
  styleUrls: ['shelters.consumer-locator.component.css'],
})

export class SheltersConsumerLocatorComponent implements AfterViewInit {

  private gmapsGeocoder: any;
  @Output() addressSuggestions: string[];
  showBouncer: boolean;
  searchQuery: string;
  searchTimeout: any;

  constructor (
    private zone: NgZone,
    private geoLocation: GeolocationService,
  ) {

  }

  ngAfterViewInit() {
    this.gmapsGeocoder = new google.maps.Geocoder();
    this.displayBouncer(true);
    this.getPosition().subscribe((position: Position) => {
      console.log(position);
      this.displayBouncer(false);

      let navigationExtras: NavigationExtras = {
        queryParams: {
          'lat': position.coords.latitude.valueOf(),
          'lng': position.coords.longitude.valueOf()
        }
      };

      this.lookupPosition(position);
    });
  }

  private lookupPosition(position: Position) {
    this.displayBouncer(true);
    this.gmapsGeocoder.geocode({
      location: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    },
      (results: any, status: string) => {
        this.displayBouncer(false);
      console.log('results', results);
        switch (status) {
          case 'OK':
            this.zone.run(() => this.addressSuggestions = results);
            break;
        }
      }
    );

  }

  private getPosition() {
    return this.geoLocation.getLocation({});
  }

  lookupAddress(address: string) {
    if (typeof address === 'undefined' || address.length < 4) {
      return;
    }

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.displayBouncer(true);

      let options = {
        address: address,
        componentRestrictions: {
          country: 'SE'
        }
      }

      this.gmapsGeocoder.geocode(options,
        (results:any, status:any) => {
          this.displayBouncer(false);
          switch (status) {
            case google.maps.GeocoderStatus.REQUEST_DENIED:
              break;
            case google.maps.GeocoderStatus.UNKNOWN_ERROR:
              break;
            case google.maps.GeocoderStatus.INVALID_REQUEST:
              break;
            case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
              break;
            case google.maps.GeocoderStatus.ZERO_RESULTS:
              break;
            case google.maps.GeocoderStatus.OK:
              console.log(results);
              this.addressSuggestions = results;
          }
        }
      );
    }, 350);

  }

  private displayBouncer(value: boolean) {
    this.showBouncer = value;
  }

}
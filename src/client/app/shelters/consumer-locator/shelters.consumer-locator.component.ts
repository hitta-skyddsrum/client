import {Component, AfterContentInit, AfterViewInit, Output, NgZone, Input, EventEmitter} from '@angular/core';
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
  @Output() addressSuggestions: any[];
  showBouncer: boolean;
  searchQuery: string;
  searchTimeout: any;

  constructor (
    private zone: NgZone,
    private geoLocation: GeolocationService,
    private gmapsGeocoderService: GmapsGeocoderService
  ) {
    this.gmapsGeocoder = new google.maps.Geocoder();
  }

  ngAfterViewInit() {
    this.displayBouncer(true);

    this.geoLocation.getLocation({}).subscribe(
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
        this.updateAddressSuggestions(results);
        this.displayBouncer(false);
      },
      () => this.displayBouncer(false),
      () => this.displayBouncer(false),
    )
  }

  lookupAddress(address: string) {
    if (typeof address === 'undefined' || address.length < 4) {
      return;
    }

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.displayBouncer(true);
    this.gmapsGeocoderService.lookupAddress(address).subscribe(
      (result: any[]) => {
        console.log('resultat: ', result[0]);
        this.updateAddressSuggestions(result);
        this.displayBouncer(false);
      },
      () => this.displayBouncer(false),
      () => this.displayBouncer(false),
    )

  }

  private displayBouncer(value: boolean) {
    this.zone.run(() => this.showBouncer = value);
  }

  private updateAddressSuggestions(addresses: any[]) {
    this.zone.run(() => this.addressSuggestions = addresses);
  }
}
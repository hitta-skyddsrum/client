import { Component, AfterViewInit, Output, NgZone } from '@angular/core';
import { GeolocationService } from '../../shared/geolocation/geolocation.service';
import { Router } from '@angular/router';
import { GmapsGeocoderService } from '../../shared/gmaps-geocoder/gmaps-geocoder.service';
import { Position } from '../../../models/position.model';

declare var google: any;

@Component({

  templateUrl: 'shelters.consumer-locator.component.html',
  styleUrls: ['shelters.consumer-locator.component.scss'],
  selector: 'hs-consumer-locator'
})

export class SheltersConsumerLocatorComponent implements AfterViewInit {

  private gmapsGeocoder: any;
  @Output() addressSuggestions: any[];
  showBouncer: boolean;
  searchQuery: string;
  searchTimeout: any;

  constructor (
    router: Router,
    private zone: NgZone,
    private geoLocation: GeolocationService,
    private gmapsGeocoderService: GmapsGeocoderService
  ) {
    this.gmapsGeocoder = new google.maps.Geocoder();
  }

  ngAfterViewInit() {
    this.geoLocation.getLocation().subscribe(
      (pos: any) => {
        this.lookupPosition(<Position> {
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        });
      },
      () => {
      },
      () => {
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
    );
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
    );

  }

  chooseAddress(address: any) {
    this.addressSuggestions = [];
    this.searchQuery = address.formatted_address;
  }

  private displayBouncer(value: boolean) {
    this.zone.run(() => this.showBouncer = value);
  }

  private updateAddressSuggestions(addresses: any[]) {
    this.zone.run(() => this.addressSuggestions = addresses);
  }
}

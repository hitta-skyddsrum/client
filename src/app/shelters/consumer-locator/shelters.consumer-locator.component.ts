import { Component, AfterViewInit, Output, NgZone } from '@angular/core';
import { GeolocationService } from '../../shared/geolocation/geolocation.service';
import { Router } from '@angular/router';
import { GmapsGeocoderService } from '../../shared/gmaps-geocoder/gmaps-geocoder.service';
import { Position } from '../../../models/position.model';

@Component({
  templateUrl: 'shelters.consumer-locator.component.html',
  styleUrls: ['shelters.consumer-locator.component.scss'],
  selector: 'hs-consumer-locator'
})

export class SheltersConsumerLocatorComponent implements AfterViewInit {

  @Output() public addressSuggestions: any[];
  public showBouncer: boolean;
  public searchQuery: string;
  private searchTimeout: any;
  private gmapsGeocoder: any;

  constructor (
    private router: Router,
    private zone: NgZone,
    private geoLocation: GeolocationService,
    private gmapsGeocoderService: GmapsGeocoderService
  ) {
    this.gmapsGeocoder = new google.maps.Geocoder();
  }

  public ngAfterViewInit() {
    if (this.router.url === '/skyddsrum') {
      this.displayBouncer(true);
      this.geoLocation.getLocation().first().subscribe(
        (pos: any) => {
          this.lookupPosition(<Position> {
            lat: pos.coords.latitude,
            long: pos.coords.longitude,
          });
        }
      );
    }
  }

  public lookupAddress(address: string) {
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

  public chooseAddress(address: any) {
    this.addressSuggestions = [];
    this.searchQuery = address.formatted_address;
    this.displayBouncer(true);
    this.router
      .navigate(['/skyddsrum/koordinater', address.geometry.location.lat(), address.geometry.location.lng()])
      .then(() => this.displayBouncer(false))
      .catch(() => this.displayBouncer(false))
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

  private displayBouncer(value: boolean) {
    this.zone.run(() => this.showBouncer = value);
  }

  private updateAddressSuggestions(addresses: any[]) {
    this.zone.run(() => this.addressSuggestions = addresses);
  }
}

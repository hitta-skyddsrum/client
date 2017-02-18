import {
  Component,
  AfterViewInit,
  Output,
  NgZone,
  ViewChild,
  ElementRef
} from '@angular/core';
import { GeolocationService } from '../../shared/geolocation/geolocation.service';
import { Router } from '@angular/router';
import { GmapsGeocoderService } from '../../shared/gmaps-geocoder/gmaps-geocoder.service';
import { Position } from '../../../models/position.model';
import GeocoderResult = google.maps.GeocoderResult;

@Component({
  templateUrl: 'shelters.consumer-locator.component.html',
  styleUrls: ['shelters.consumer-locator.component.scss'],
  selector: 'hs-consumer-locator'
})

export class SheltersConsumerLocatorComponent implements AfterViewInit {

  @ViewChild('search') public searchElemRef: ElementRef;
  public showBouncer: boolean;
  public searchQuery: string;
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
    let autocomplete = new google.maps.places.Autocomplete(this.searchElemRef.nativeElement, {
      types: ['address'],
      componentRestrictions: {
        country: 'se'
      }
    });

    autocomplete.addListener('place_changed', () => {
      let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      this.chooseAddress(place);
    });

    if (this.router.url === '/skyddsrum') {
      this.displayBouncer(true);
      this.geoLocation.getLocation().first().subscribe(
        (pos: any) => {
          this.lookupPosition(<Position> {
            lat: pos.coords.latitude,
            long: pos.coords.longitude,
          });
        },
        () => this.displayBouncer(false),
        () => this.displayBouncer(false)
      );
    }
  }

  public chooseAddress(address: any) {
    this.searchQuery = address.formatted_address;
    this.displayBouncer(true);

    this.router
      .navigate(['/skyddsrum/koordinater', address.geometry.location.lat(), address.geometry.location.lng()])
      .then(() => this.displayBouncer(false))
      .catch(() => this.displayBouncer(false))
  }

  private lookupPosition(position: Position) {
    this.zone.run(() => this.displayBouncer(true));

    this.gmapsGeocoderService.lookupPosition(position).subscribe(
      (results: GeocoderResult[]) => {

        if (results.length > 0) {
          this.searchQuery = results[0].formatted_address;

          setTimeout(() => {
            google.maps.event.trigger(this.searchElemRef.nativeElement, 'focus', {})
            this.searchElemRef.nativeElement.focus();
          }, 60);
        }

        this.displayBouncer(false);
      },
      () => this.displayBouncer(false),
      () => this.displayBouncer(false),
    );
  }

  private displayBouncer(value: boolean) {
    this.zone.run(() => this.showBouncer = value);
  }
}

import {
  Component,
  AfterViewInit,
  Output,
  NgZone,
  ViewChild,
  ElementRef, trigger, transition, style, animate
} from '@angular/core';
import { GeolocationService } from '../../shared/geolocation/geolocation.service';
import { Router } from '@angular/router';
import { GmapsGeocoderService } from '../../shared/gmaps-geocoder/gmaps-geocoder.service';
import { Position } from '../../../models/position.model';
import GeocoderResult = google.maps.GeocoderResult;
import { triggerAnimation } from '@angular/compiler/src/compiler_util/render_util';

@Component({
  templateUrl: 'shelters.consumer-locator.component.html',
  styleUrls: ['shelters.consumer-locator.component.scss'],
  selector: 'hs-consumer-locator',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-100%)', opacity: 0}),
          animate('100ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('100ms', style({transform: 'translateY(-100%)', opacity: 0}))
        ])
      ]
    )
  ],
})

export class SheltersConsumerLocatorComponent implements AfterViewInit {

  @ViewChild('search') public searchElemRef: ElementRef;
  public showBouncer: boolean;
  public searchQuery: string;
  public showSearchBar: boolean;

  private gmapsGeocoder: any;
  private autocomplete: any;
  private autocompleteListener: any;

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
      this.displaySearchBar();

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

  public toggleSearchBar() {
    if (this.showSearchBar === true) {
      this.hideSearchBar();
    } else {
      this.displaySearchBar();
    }
  }

  public chooseAddress(address: any) {
    this.hideSearchBar();
    this.searchQuery = address.formatted_address;
    this.displayBouncer(true);

    this.router
      .navigate([
        '/skyddsrum/koordinater',
        address.geometry.location.lat(), address.geometry.location.lng()
      ])
      .then(() => this.displayBouncer(false))
      .catch(() => this.displayBouncer(false));
  }

  private displaySearchBar() {
    this.showSearchBar = true;

    setTimeout(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElemRef.nativeElement, {
        types: ['address'],
        componentRestrictions: {
          country: 'se'
        }
      });

      this.autocompleteListener = this.autocomplete.addListener('place_changed', () => {
        let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
        this.chooseAddress(place);
      });
    });

  }

  private hideSearchBar() {
    google.maps.event.clearInstanceListeners(this.autocomplete);
    google.maps.event.removeListener(this.autocompleteListener);
    this.showSearchBar = false;
  }

  private lookupPosition(position: Position) {
    this.zone.run(() => this.displayBouncer(true));

    this.gmapsGeocoderService.lookupPosition(position).subscribe(
      (results: GeocoderResult[]) => {

        if (results.length > 0) {
          this.searchQuery = results[0].formatted_address;

          setTimeout(() => {
            google.maps.event.trigger(this.searchElemRef.nativeElement, 'focus', {});
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

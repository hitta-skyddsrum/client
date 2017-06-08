import { AfterViewInit, Component, ElementRef, Input, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Position } from '../../position.model';
import { GeolocationService } from 'app/shared/geolocation/geolocation.service';
import { GmapsGeocoderService } from 'app/shared/gmaps-geocoder/gmaps-geocoder.service';
import GeocoderResult = google.maps.GeocoderResult;

@Component({
  templateUrl: 'search-box.component.html',
  styleUrls: ['search-box.component.scss'],
  selector: 'search-box'
})

export class SearchBoxComponent implements AfterViewInit {

  @Input()
  public showOnload: boolean = false;

  @ViewChild('search')
  public searchElemRef: ElementRef;

  public showBouncer: boolean;
  public searchQuery: string;
  public showSearchBar: boolean;

  private autocomplete: any;
  private autocompleteListener: any;

  constructor (
    private router: Router,
    private zone: NgZone,
    private geoLocation: GeolocationService,
    private gmapsGeocoderService: GmapsGeocoderService
  ) {}

  public ngAfterViewInit() {
    if (this.showOnload) {
      this.displaySearchBar();
    }
  }

  public onAddressChoosen(place: any): void {
    debugger;
  }

  public findUsersPosition(): void {
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

  public toggleSearchBar(): void {
    if (this.showSearchBar === true) {
      this.hideSearchBar();
    } else {
      this.displaySearchBar();
    }
  }

  public chooseAddress(address: any): void {
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
  }

  private hideSearchBar() {
    this.showSearchBar = false;
  }

  private lookupPosition(position: Position) {
    this.displayBouncer(true);

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

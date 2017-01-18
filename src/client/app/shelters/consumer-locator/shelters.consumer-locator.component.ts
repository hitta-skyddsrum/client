import {Component, AfterContentInit, AfterViewInit} from '@angular/core';
import {GeolocationService} from '../../shared/geolocation/geolocation.service';
import {ActivatedRoute, Router, NavigationExtras} from "@angular/router";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  templateUrl: 'shelters.consumer-locator.component.html'
})

export class SheltersConsumerLocatorComponent implements AfterViewInit {
  constructor (
    private geoLocation: GeolocationService,
    private router: Router
  ) {

  }

  ngAfterViewInit() {
    this.getPosition().subscribe((position: Position) => {
      console.log(position);

      let navigationExtras: NavigationExtras = {
        queryParams: {
          'lat': position.coords.latitude.valueOf(),
          'lng': position.coords.longitude.valueOf()
        }
      };
      this.router.navigate(['/skyddsrum'], navigationExtras);
    });
  }

  getPosition() {
    return this.geoLocation.getLocation({});
  }

}
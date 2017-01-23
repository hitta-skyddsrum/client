import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  templateUrl: 'shelters.info-box.component.html',
  styleUrls: ['shelters.info-box.component.css'],
})

export class SheltersInfoBoxComponent {
  showBouncer: boolean = false;

  constructor(
    private router: Router
  ) {

    router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.showBouncer = true;
    }
    if (event instanceof NavigationEnd) {
      this.showBouncer = false;
    }

    // Set showBouncer state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showBouncer = false;
    }
    if (event instanceof NavigationError) {
      this.showBouncer = false;
    }
  }
}

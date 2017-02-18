import { Component } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({

  templateUrl: 'shelters.info-box.component.html',
  styleUrls: [],
})

export class SheltersInfoBoxComponent {
  public showBouncer: boolean = false;

  constructor(
    private router: Router
  ) {
    router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.showBouncer = true;
    }
    if (event instanceof NavigationEnd) {
      this.showBouncer = false;
    }

    if (event instanceof NavigationCancel) {
      this.showBouncer = false;
    }
    if (event instanceof NavigationError) {
      this.showBouncer = false;
    }
  }
}

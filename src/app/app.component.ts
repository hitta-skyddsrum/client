import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mdIconRegistry: MdIconRegistry
  ) {
    activatedRoute.fragment
      .filter((fragment: string) => typeof fragment !== 'undefined')
      .filter((fragment: string) => fragment !== null)
      .filter((fragment: string) => fragment.indexOf('!') === 0)
      .subscribe((fragment: any) => {
        router.navigate([fragment.substr(1)]);
      });

    router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: any) => this.trackPage(event.url));
  }

  private trackPage(url: string) {
    ga('send', 'pageview', url);
  }
}

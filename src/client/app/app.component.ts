import { Component } from '@angular/core';
import { Config } from './shared/config/env.config';
import './operators';
import {MetaService} from "ng2-meta";
import {Router, Event} from "@angular/router";

declare var ga:any;
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  currentRoute: string = '';

  constructor(
    router: Router,
    private metaService: MetaService,
  ) {
    console.log('Environment config', Config);

    router.events.subscribe((event: Event) => {
      var newRoute = event.url || '/';
      if(newRoute !== this.currentRoute) {
        ga('send', 'pageview', newRoute);
        this.currentRoute = newRoute;
      }
    });
  }
}

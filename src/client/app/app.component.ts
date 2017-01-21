import { Component } from '@angular/core';
import { Config } from './shared/config/env.config';
import './operators';
import {MetaService} from "ng2-meta";

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(private metaService: MetaService) {
    console.log('Environment config', Config);
  }
}

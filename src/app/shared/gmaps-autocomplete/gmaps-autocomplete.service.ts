import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GmapsAutocompleteService {
  private gmapsAutocomplete$: Observable<any>;
  private gmapsAutocomplete: any;

  constructor() {
    this.gmapsAutocomplete$ = Observable.create(observer => {
      setTimeout(() => {
        if (typeof google === 'undefined') {
          observer.error();
        }

        if (!this.gmapsAutocomplete) {
          this.gmapsAutocomplete = new google.maps.Geocoder();
        }

        observer.next(this.gmapsAutocomplete);
        observer.complete();
      });
    });
  }


}

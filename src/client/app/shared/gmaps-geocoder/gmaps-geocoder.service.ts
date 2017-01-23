import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Position } from '../api/api.service';

declare var google: any;

@Injectable()
export class GmapsGeocoderService {

  private gmapsGeocoder: any;

  constructor(

  ) {
    this.gmapsGeocoder = new google.maps.Geocoder();
  }

  lookupPosition(position: Position) {
    return Observable.create((observer: any) => {

      this.gmapsGeocoder.geocode({
          location: {
            lat: position.lat,
            lng: position.long
          }
        },
        (results: any, status: string) => {
          switch (status) {
            case 'OK':
              observer.next(results);
              observer.complete(results);
              break;
            default:
              observer.error(status);
          }
        }
      );
    });

  }

  lookupAddress(address: string) {
    return Observable.create((observer: any) => {
      let options = {
        address: address,
        componentRestrictions: {
          country: 'SE'
        }
      };

      this.gmapsGeocoder.geocode(options,
        (results:any, status:any) => {
          switch (status) {
            case google.maps.GeocoderStatus.REQUEST_DENIED:
            case google.maps.GeocoderStatus.UNKNOWN_ERROR:
            case google.maps.GeocoderStatus.INVALID_REQUEST:
            case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
            case google.maps.GeocoderStatus.ZERO_RESULTS:
              observer.error(status);
              break;
            case google.maps.GeocoderStatus.OK:
              observer.next(results);
          }
        });
    });

  }
}

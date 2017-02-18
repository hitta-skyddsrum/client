import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Position } from '../../../models/position.model';

@Injectable()
export class GmapsGeocoderService {

  private gmapsGeocoder: any;

  constructor() {
    this.gmapsGeocoder = new google.maps.Geocoder();
  }

  public getHighestSublocalityAddress(addresses: any[]) {
    let ordered: any[] = [];
    let prefix = 'sublocality_level_';

    for (let address of addresses) {
      let subs = address.types.filter((k: string[]) => {
        return k.indexOf(prefix) === 0;
      });

      if (subs.length === 0) {
        continue;
      }

      let level = subs[0].replace(prefix, '');

      ordered[level] = address;
    }

    return ordered.slice(-1).pop();
  }

  public lookupPosition(position: Position) {
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

  public lookupAddress(address: string) {
    return Observable.create((observer: any) => {
      let options = {
        address,
        componentRestrictions: {
          country: 'SE'
        }
      };

      this.gmapsGeocoder.geocode(options,
        (results: any, status: any) => {
          switch (status) {
            case google.maps.GeocoderStatus.OK:
              observer.next(results);
            case google.maps.GeocoderStatus.REQUEST_DENIED:
            case google.maps.GeocoderStatus.UNKNOWN_ERROR:
            case google.maps.GeocoderStatus.INVALID_REQUEST:
            case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
            case google.maps.GeocoderStatus.ZERO_RESULTS:
            default:
              observer.error(status);
              break;
          }
        });
    });

  }
}

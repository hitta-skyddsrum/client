import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Position } from '../../../models/position.model';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class GmapsGeocoderService {

  private gmapsGeocoder: any;

  constructor() {
    this.gmapsGeocoder = new google.maps.Geocoder();
  }

  public getHighestSublocalityAddress(addresses: any[]) {
    const ordered: any[] = [];
    const prefix = 'sublocality_level_';

    for (const address of addresses) {
      const subs = address.types.filter((k: string[]) => {
        return k.indexOf(prefix) === 0;
      });

      if (subs.length === 0) {
        continue;
      }

      const level = subs[0].replace(prefix, '');

      ordered[level] = address;
    }

    return ordered.slice(-1).pop();
  }

  public lookupPosition(position: Position):
  Observable <google.maps.GeocoderResult[]|ErrorObservable> {
    return Observable
      .bindCallback(this.gmapsGeocoder.geocode(
        {
          location: {
            lat: Number(position.lat),
            lng: Number(position.long),
          }
        }
      ))
      .map(status => status !== 'OK' ? Observable.throw(status) : status);
  }

  public lookupAddress(address: string) {
    return Observable.create((observer: any) => {
      const options = {
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

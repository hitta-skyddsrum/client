import { Observable } from 'rxjs/Observable';

export class GeolocationServiceMock {
  public getLocation(): Observable <any> {
    return Observable.of({});
  }
}

import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Config} from "../config/env.config";
// import 'rxjs/add/operator/do';  // for debugging

export interface Shelter {
  id: number,
  address: string,
  municipality: string,
  city: string,
  slots: number,
  air_cleaners: number,
  filter_type: string,
  shelter_id: string,
  estate_id: string,
  goid: string,
  position: Position
}

export interface Hospital {
  position: Position,
  name: string,
  address: string,
}

export interface Position {
  long: number,
  lat: number
}

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class ApiService {

  /**
   * Creates a new ApiService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  getShelters(position: Position): Observable<Shelter[]> {
    let uri: string = Config.API + '/shelters';
    let params: URLSearchParams = new URLSearchParams();
    params.set('lat', <string>position.lat.toString());
    params.set('long', <string>position.long.toString());
    let options: RequestOptions = new RequestOptions({
      search: params
    });

    console.log('params', params);

    return this.http.get(uri, options)
                    .map(res => <Shelter[]>res.json())
    //              .do(data => console.log('server data:', data))  // debug
                    .catch(this.handleError);
  }

  shelters() {
    let apiService = this;
    return {
      show(params: Object = null) {
        let uri: string = Config.API + '/shelters/' + params.id;

        return apiService.http.get(uri)
          .map((result: any) => <Shelter>result.json())
          //              .do(data => console.log('server data:', data))  // debug
          .catch(this.handleError);
      },

      showHospitals(params: Object = null) {
        let uri: string = Config.API + '/shelters/' + params.id + '/hospitals';

        return apiService.http.get(uri)
          .map((result: any) => <Hospital[]>result.json())
          //              .do(data => console.log('server data:', data))  // debug
          .catch(this.handleError);
      }
    }
  }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}


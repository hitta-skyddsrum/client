import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Shelter } from '../../../models/shelter.model';
import { Hospital } from '../../../models/hospital.model';
import { Position } from '../../../models/position.model';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import Raven from 'raven-js';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class ApiService {
  private apiUrl: string = API_URL;

  constructor(
    private http: Http,
    private dialog: MdDialog
  ) {}

  public shelters() {
    const apiService = this;
    return {
      index(position: Position): Observable<Shelter[]> {
        const uri: string = apiService.apiUrl + '/shelters/';
        const params: URLSearchParams = new URLSearchParams();
        params.set('lat', <string> position.lat.toString());
        params.set('long', <string> position.long.toString());
        const options: RequestOptions = new RequestOptions({
          search: params
        });

        return apiService.http.get(uri, options)
          .map((res: any) => <Shelter[]> res.json())
          //              .do(data => console.log('server data:', data))  // debug
          .catch(apiService.handleError);
      },

      show(params: any = null) {
        const uri: string = apiService.apiUrl + '/shelters/' + params.id;

        return apiService.http.get(uri)
          .map((result: any) => <Shelter> result.json())
          //              .do(data => console.log('server data:', data))  // debug
          .catch(apiService.handleError);
      },

      showHospitals(params: any = null) {
        const uri: string = apiService.apiUrl + '/shelters/' + params.id + '/hospitals';

        return apiService.http.get(uri)
          .map((result: any) => <Hospital[]> result.json())
          //              .do(data => console.log('server data:', data))  // debug
          .catch(apiService.handleError);
      }
    };
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    this.dialog.open(DialogComponent, { data: { header: 'Någonting gick fel', message: errMsg } });
    Raven.captureException(error);
    return Observable.throw(errMsg);
  }
}

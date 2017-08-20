import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../../shared/api/api.service';
import { Shelter } from '../../../models/shelter.model';

@Injectable()
export class SheltersListResolver implements Resolve<Shelter[]> {

  constructor(
    private apiService: ApiService
  ) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.apiService.shelters().index({
      lat: route.params['lat'],
      long: route.params['lng']
    });
  }
}

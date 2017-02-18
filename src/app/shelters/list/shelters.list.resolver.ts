import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../../shared/api/api.service';
import { Position } from '../../../models/position.model';
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
    let position: Position = <Position> {
      lat: route.params['lat'],
      long: route.params['lng']
    };
    return this.apiService.shelters().index(position);
  }
}

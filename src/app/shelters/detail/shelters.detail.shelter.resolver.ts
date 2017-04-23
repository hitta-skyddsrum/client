import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../../shared/api/api.service';
import { Shelter } from '../shelter.model';

@Injectable()
export class SheltersDetailShelterResolver implements Resolve<Shelter> {

  constructor(
    private apiService: ApiService
  ) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.apiService.shelters().show(route.params);
  }
}

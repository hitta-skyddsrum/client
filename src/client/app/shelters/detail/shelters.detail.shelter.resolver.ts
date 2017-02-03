import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../../shared/api/api.service';
import { Shelter } from '../../../models/shelter.model';

@Injectable()
export class SheltersDetailShelterResolver implements Resolve<Shelter> {

  constructor(
    private apiService: ApiService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.apiService.shelters().show(route.params);
  }
}

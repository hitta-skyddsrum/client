import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../../shared/api/api.service';
import { Hospital } from '../hospital.model';

@Injectable()
export class SheltersDetailHospitalResolver implements Resolve<Hospital[]> {

  constructor(
    private apiService: ApiService
  ) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.apiService.shelters().showHospitals(route.params);
  }
}

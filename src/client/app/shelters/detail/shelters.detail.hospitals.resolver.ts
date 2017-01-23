import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService, Hospital } from '../../shared/api/api.service';

@Injectable()
export class SheltersDetailHospitalResolver implements Resolve<Hospital[]> {

  constructor(
    private apiService: ApiService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.apiService.shelters().showHospitals(route.params);
  }
}

import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {ApiService, Shelter} from "../../shared/api/api.service";

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
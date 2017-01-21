import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {ApiService, Position, Shelter} from "../../shared/api/api.service";

@Injectable()
export class SheltersListResolver implements Resolve<Shelter[]> {

  constructor(
    private apiService: ApiService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    let position: Position = <Position> {
      lat: route.queryParams['lat'],
      long: route.queryParams['lng']
    };
    return this.apiService.getShelters(position);
  }
}
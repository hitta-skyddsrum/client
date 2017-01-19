import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {Shelter} from "../../shared/api/api.service";
import {Observer} from "rxjs";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/filter';

@Injectable()
export class SheltersUserStateService {
  private selectedShelter: BehaviorSubject<Shelter> = new BehaviorSubject<Shelter>(null);
  selectedShelter$ = this.selectedShelter.asObservable().filter(s => s !== null);

  private currentPosition: BehaviorSubject<Position> = new BehaviorSubject<Position>(null);
  currentPosition$ = this.currentPosition.asObservable().filter(cp => cp !== null);

  private shelters: BehaviorSubject<Shelter[]> = new BehaviorSubject<Shelter[]>([]);
  shelters$ = this.shelters.asObservable().filter(s => s.length > 0);

  private mapIsLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  whenMapIsLoaded$ = this.mapIsLoaded.asObservable().filter(r => r === true);

  private sheltersIsPlottedOnMap: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  whenSheltersIsPlotted$ = this.sheltersIsPlottedOnMap.asObservable().filter(r => r === true);

  constructor() {
    /*
    this.selectedShelter$ = Observable.create((observer: Observer <any>) => {
      this._observer = observer;
    });

    this.currentPosition$ = Observable.create((observer: Observer <any>) => {
      this._cpObserver = observer;
    });
    */
  }

  setPosition(position: Position) {
    this.currentPosition.next(position);
  }

  selectShelter(shelter: Shelter) {
    this.selectedShelter.next(shelter);
  }

  setShelters(shelters: Shelter[]) {
    this.shelters.next(shelters);
  }

  setMapAsLoaded() {
    this.mapIsLoaded.next(true);
  }

  sheltersIsPlotted(value: boolean) {
    this.sheltersIsPlottedOnMap.next(value);
  }
}
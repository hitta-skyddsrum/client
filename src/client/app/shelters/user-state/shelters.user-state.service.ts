import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Shelter} from "../../shared/api/api.service";
import {Observer} from "rxjs";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class SheltersUserStateService {
  private selectedShelter: BehaviorSubject<Shelter> = new BehaviorSubject<Shelter>(null);
  selectedShelter$ = this.selectedShelter.asObservable();

  private currentPosition: BehaviorSubject<Position> = new BehaviorSubject<Position>(null);
  currentPosition$ = this.currentPosition.asObservable();

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
}
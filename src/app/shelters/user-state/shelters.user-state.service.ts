import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';
import { Shelter } from '../../../models/shelter.model';
import { Hospital } from '../../../models/hospital.model';
import { Position } from '../../../models/position.model';

@Injectable()
export class SheltersUserStateService {
  private selectedShelter: BehaviorSubject<Shelter> = new BehaviorSubject<Shelter>(null);
  selectedShelter$ = this.selectedShelter.asObservable().filter(s => s !== null);

  private selectedHospital: BehaviorSubject<Hospital> = new BehaviorSubject<Hospital>(null);
  selectedHospital$ = this.selectedHospital.asObservable().filter(h => h !== null);

  private currentPosition: BehaviorSubject<Position> = new BehaviorSubject<Position>(null);
  currentPosition$ = this.currentPosition.asObservable().filter(cp => cp !== null);

  private shelters: BehaviorSubject<Shelter[]> = new BehaviorSubject<Shelter[]>([]);
  shelters$ = this.shelters.asObservable().filter(s => s.length > 0);

  private mapIsLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  whenMapIsLoaded$ = this.mapIsLoaded.asObservable().filter(r => r === true);

  private hospitals: BehaviorSubject<Hospital[]> = new BehaviorSubject<Hospital[]>([]);
  hospitals$ = this.hospitals.asObservable().filter(h => h.length > 0);

  private currentStep: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentStep$ = this.currentStep.asObservable().filter(cs => cs > 0);

  private shouldSelectClosestShelter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  shouldSelectClosestShelter$ = this.shouldSelectClosestShelter.asObservable().filter(v => v === true);

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

  setHospitals(hospitals: Hospital[]) {
    this.hospitals.next(hospitals);
  }

  setCurrentStep(step: number) {
    this.currentStep.next(step);
  }

  selectHospital(hospital: Hospital) {
    this.selectedHospital.next(hospital);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';
import { Shelter } from '../../../models/shelter.model';
import { Hospital } from '../../../models/hospital.model';
import { Position } from '../../../models/position.model';
import { Observable } from 'rxjs';

@Injectable()
export class SheltersUserStateService {
  public selectedShelter$: Observable <Shelter>;
  public selectedHospital$: Observable <Hospital>;
  public currentPosition$: Observable <Position>;
  public shelters$: Observable <Shelter[]>;
  public whenMapIsLoaded$: Observable <boolean>;
  public hospitals$: Observable <Hospital[]>;
  public currentStep$: Observable <number>;
  public shouldSelectClosestShelter$: Observable <boolean>;

  private selectedShelter: BehaviorSubject<Shelter> = new BehaviorSubject<Shelter>(null);
  private selectedHospital: BehaviorSubject<Hospital> = new BehaviorSubject<Hospital>(null);
  private currentPosition: BehaviorSubject<Position> = new BehaviorSubject<Position>(null);
  private shelters: BehaviorSubject<Shelter[]> = new BehaviorSubject<Shelter[]>([]);
  private mapIsLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private hospitals: BehaviorSubject<Hospital[]> = new BehaviorSubject<Hospital[]>([]);
  private currentStep: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private shouldSelectClosestShelter: BehaviorSubject<boolean>
            = new BehaviorSubject<boolean>(false);

  constructor() {
    this.selectedShelter$ = this.selectedShelter.asObservable().filter((s) => s !== null);
    this.selectedHospital$ = this.selectedHospital.asObservable().filter((h) => h !== null);
    this.currentPosition$ = this.currentPosition.asObservable().filter((cp) => cp !== null);
    this.shelters$ = this.shelters.asObservable().filter((s) => s.length > 0);
    this.whenMapIsLoaded$ = this.mapIsLoaded.asObservable().filter((r) => r === true);
    this.hospitals$ = this.hospitals.asObservable().filter((h) => h.length > 0);
    this.currentStep$ = this.currentStep.asObservable().filter((cs) => cs > 0);
    this.shouldSelectClosestShelter$
      = this.shouldSelectClosestShelter.asObservable().filter((v) => v === true);
  }

  public setPosition(position: Position) {
    this.currentPosition.next(position);
  }

  public selectShelter(shelter: Shelter) {
    this.selectedShelter.next(shelter);
  }

  public setShelters(shelters: Shelter[]) {
    this.shelters.next(shelters);
  }

  public setMapAsLoaded() {
    this.mapIsLoaded.next(true);
  }

  public setHospitals(hospitals: Hospital[]) {
    this.hospitals.next(hospitals);
  }

  public setCurrentStep(step: number) {
    this.currentStep.next(step);
  }

  public selectHospital(hospital: Hospital) {
    this.selectedHospital.next(hospital);
  }
}

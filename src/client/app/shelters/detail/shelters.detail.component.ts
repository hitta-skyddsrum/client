import {Component, OnInit} from '@angular/core';
import {SheltersUserStateService} from "../user-state/shelters.user-state.service";
import {ActivatedRoute} from "@angular/router";
import {Shelter, Hospital} from "../../shared/api/api.service";
import {MetaService} from "ng2-meta";

@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: '../shelters.component.html',
  styleUrls: ['../shelters.component.css'],
})

export class SheltersDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private sheltersUserStateService: SheltersUserStateService,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    let shelter: Shelter = this.route.snapshot.data['shelter'];
    this.sheltersUserStateService.setShelters([shelter]);
    this.sheltersUserStateService.selectShelter(shelter);

    setTimeout(() => {
      this.metaService.setTitle('Skyddsrum ' + shelter.estateId + ', ' + shelter.city);
    });

    let hospitals: Hospital[] = this.route.snapshot.data['hospitals'];
    this.sheltersUserStateService.setHospitals(hospitals);
    this.sheltersUserStateService.selectHospital(hospitals[0]);

    this.sheltersUserStateService.selectedHospital$.subscribe(
      () => this.sheltersUserStateService.setCurrentStep(2)
    ).unsubscribe();
  }
}
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService, Shelter, Position } from '../../shared/api/api.service';
import { SheltersUserStateService } from '../user-state/shelters.user-state.service';
import { ActivatedRoute } from '@angular/router';
import { SheltersMapComponent } from '../map/shelters.map.component';
import { SheltersInfoBoxComponent } from '../info-box/shelters.info-box.component';
import { GmapsGeocoderService } from '../../shared/gmaps-geocoder/gmaps-geocoder.service';
import { MetaService } from 'ng2-meta';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: '../shelters.component.html',
})

export class SheltersListComponent implements OnInit, AfterViewInit {

  shelters: Shelter[] = [];
  private currentPosition: Position;

  @ViewChild(SheltersMapComponent) sheltersMapComponent: SheltersMapComponent;
  @ViewChild(SheltersInfoBoxComponent) sheltersInfoBoxComponent: SheltersInfoBoxComponent;

  /**
   * Creates an instance of the SheltersComponent with the injected
   * ApiService.
   *
   * @param {ApiService} apiService - The injected ApiService.
   */
  constructor(
    private route: ActivatedRoute,
    private metaService: MetaService,
    private sheltersUserStateService: SheltersUserStateService,
    private gmapsGeocoderService: GmapsGeocoderService,
  ) {}

  ngOnInit() {
    this.currentPosition = <Position> {
      lat: Number(this.route.snapshot.params['lat']),
      long: Number(this.route.snapshot.params['lng'])
    };

    this.sheltersUserStateService.setPosition(this.currentPosition);

    // Clean the map on init
    this.sheltersUserStateService.setHospitals([]);
//    this.sheltersUserStateService.setShelters([]);


    this.sheltersUserStateService.setShelters(
      this.route.snapshot.data['shelters']
    );

    this.sheltersUserStateService.shelters$.subscribe(
      (shelters: Shelter[]) => this.sheltersUserStateService.selectShelter(shelters[0])
    ).unsubscribe();

    this.sheltersUserStateService.selectedShelter$.subscribe(
      (shelter: Shelter) => {
        this.sheltersUserStateService.setCurrentStep(2);
      }
    ).unsubscribe();
  }

  ngAfterViewInit() {
    this.gmapsGeocoderService.lookupPosition(this.currentPosition).subscribe(
      (addresses:any[]) => {
        console.log(addresses);
        setTimeout(() => {
          this.metaService.setTitle('Hitta skyddsrum nära ' + addresses[1].formatted_address);
        });
      }
    );
  }
}

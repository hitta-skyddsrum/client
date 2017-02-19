import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { SheltersUserStateService } from '../user-state/shelters.user-state.service';
import { ActivatedRoute } from '@angular/router';
import { SheltersMapComponent } from '../map/shelters.map.component';
import { SheltersInfoBoxComponent } from '../info-box/shelters.info-box.component';
import { GmapsGeocoderService } from '../../shared/gmaps-geocoder/gmaps-geocoder.service';
import { MetaService } from 'ng2-meta';
import { Shelter } from '../../../models/shelter.model';
import { Position } from '../../../models/position.model';
import { SheltersComponent } from '../shelters.component';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  template: ''
})

export class SheltersListComponent implements OnInit, AfterViewInit {

  private shelters: Shelter[] = [];
  private currentPosition: Position;

  constructor(
    private route: ActivatedRoute,
    private metaService: MetaService,
    private sheltersUserStateService: SheltersUserStateService,
    private gmapsGeocoderService: GmapsGeocoderService,
  ) {
  }

  public ngOnInit() {
    this.currentPosition = <Position> {
      lat: Number(this.route.snapshot.params['lat']),
      long: Number(this.route.snapshot.params['lng'])
    };
    this.sheltersUserStateService.setPosition(this.currentPosition);

    // Clean the map on init
    this.sheltersUserStateService.setHospitals([]);

    this.route.data.first().subscribe((data: any) => {
      this.sheltersUserStateService.setShelters(data['shelters']);
    });
  }

  public ngAfterViewInit() {
    this.gmapsGeocoderService.lookupPosition(this.currentPosition).first().subscribe(
      (addresses: any[]) => this.setTitle(addresses)
    );

    this.sheltersUserStateService.shelters$.first().subscribe(
      (shelters: Shelter[]) => this.sheltersUserStateService.selectShelter(shelters[0])
    );

    this.sheltersUserStateService.selectedShelter$.first().subscribe(
      (shelter: Shelter) => {
        this.sheltersUserStateService.setCurrentStep(2);
      }
    );
  }

  private setTitle(addresses: any[]) {
    let title: string =  'Visa skyddsrum';

    if (addresses.length > 0) {
      let address = this.gmapsGeocoderService.getHighestSublocalityAddress(addresses);

      // Fallback
      if (typeof address === 'undefined') {
        address = addresses[0];
      }

      title += ' nära ' + address.formatted_address;
    }

    setTimeout(() => {
      this.metaService.setTitle(title);
    });
  }
}

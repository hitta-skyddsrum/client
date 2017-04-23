import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SheltersUserStateService } from '../user-state/shelters.user-state.service';
import { ActivatedRoute } from '@angular/router';
import { GmapsGeocoderService } from '../../shared/gmaps-geocoder/gmaps-geocoder.service';
import { Shelter } from '../shelter.model';
import { Position } from '../position.model';
import { MetaService } from '@nglibs/meta';

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

  public ngAfterViewInit() {
    this.gmapsGeocoderService.lookupPosition(this.currentPosition).subscribe(
      (addresses: any[]) => this.setTitle(addresses)
    );
  }

  private setTitle(addresses: any[]) {
    let title: string =  'Visa skyddsrum';

    if (addresses.length > 0) {
      let address = this.gmapsGeocoderService.getHighestSublocalityAddress(addresses);

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

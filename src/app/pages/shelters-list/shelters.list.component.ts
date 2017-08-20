import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SheltersUserStateService } from '../../shelters/user-state/shelters.user-state.service';
import { ActivatedRoute } from '@angular/router';
import { GmapsGeocoderService } from '../../shared/gmaps-geocoder/gmaps-geocoder.service';
import { Shelter } from '../../../models/shelter.model';
import { Position } from '../../../models/position.model';
import { MetaService } from '@ngx-meta/core';

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
    this.route.params
      .subscribe(params => {
        this.currentPosition = <Position> {
          lat: Number(params['lat']),
          long: Number(params['lng'])
        };

        this.sheltersUserStateService.setPosition(this.currentPosition);
      });

    this.route.data
      .subscribe(data => {
        // Clean the map on init
        this.sheltersUserStateService.setHospitals([]);

        this.sheltersUserStateService.setShelters(data['shelters']);

        this.sheltersUserStateService.shelters$
          .first()
          .subscribe((shelters: Shelter[]) =>
            this.sheltersUserStateService.selectShelter(shelters[0])
          );

        this.sheltersUserStateService.selectedShelter$
          .first()
          .subscribe((shelter: Shelter) => this.sheltersUserStateService.setCurrentStep(2));
      });
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

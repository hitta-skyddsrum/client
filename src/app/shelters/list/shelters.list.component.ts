import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SheltersUserStateService } from '../user-state/shelters.user-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GmapsGeocoderService } from '../../shared/gmaps-geocoder/gmaps-geocoder.service';
import { Shelter } from '../shelter.model';
import { Position } from '../position.model';
import { MetaService } from '@nglibs/meta';

@Component({
  templateUrl: 'shelters.list.component.html'
})

export class SheltersListComponent implements OnInit, AfterViewInit {

  public currentPosition: Position;
  public shelters: Shelter[] = [];

  public shelterMarkerOptions: any = {
    icon: {
      url: '/assets/images/icon-shelter.png'
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private metaService: MetaService,
    private sheltersUserStateService: SheltersUserStateService,
    private gmapsGeocoderService: GmapsGeocoderService,
  ) {}

  public ngOnInit() {
    this.setCurrentPosition(Number(this.route.snapshot.params['lat']), Number(this.route.snapshot.params['lng']))
    this.route.data
      .subscribe(data => this.shelters = data['shelters']);
  }

  public ngAfterViewInit() {
    this.gmapsGeocoderService.lookupPosition(this.currentPosition).subscribe(
      (addresses: any[]) => this.setTitle(addresses)
    );
  }

  public onClick(shelter: Shelter): void {
    this.router.navigate(['skyddsrum', shelter.id]);
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

  private setCurrentPosition(lat: number, long: number): void {
    this.currentPosition = <Position> {lat: lat, long: long};
    this.sheltersUserStateService.setPosition(this.currentPosition);
  }
}

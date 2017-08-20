import { SheltersSearchComponent } from 'app/pages/shelters-search/shelters-search.component';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { SharedModule } from 'app/shared/shared.module';
import { GmapsGeocoderService } from 'app/shared/gmaps-geocoder/gmaps-geocoder.service';
import { WindowRefService } from 'app/shelters/window-ref.services';
import { GeolocationService } from 'app/shared/geolocation/geolocation.service';
import { GeolocationServiceMock } from 'app/shared/geolocation/geolocation.service.mock';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { MockComponent } from 'ng2-mock-component';

class GmapsGeocoderServiceMock {
  public lookupPosition() {
    return Observable.of({});
  }
}

// tslint:disable-next-line
class WindowMock {
  public nativeWindow = {
    google: {
      maps: {
        Geocoder: () => {},
        places: {
          Autocomplete: () => {
            return {
              addListener: () => true
            };
          }
        },
      },
    },
  };
}

describe('SheltersSearchComponent', () => {
  let comp: SheltersSearchComponent;
  let fixture: ComponentFixture<SheltersSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SheltersSearchComponent,
        MockComponent({ selector: 'hs-search-by-address' })
      ],
      imports: [SharedModule],
      providers: [
        {
          provide: GmapsGeocoderService,
          useClass: GmapsGeocoderServiceMock,
        },
        {
          provide: WindowRefService,
          useClass: WindowMock,
        },
        {
          provide: GeolocationService,
          useClass: GeolocationServiceMock,
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SheltersSearchComponent);
    comp = fixture.componentInstance;
  });

  fdescribe('ngOnInit', () => {
    it('should retrieve the users position', async () => {
      const geolocation = { lat: 59, long: 100 };
      const geoAddress = [
        {
          formatted_address: 'Lunkmakargatan 3',
        }
      ];
      const geoSpy = spyOn(GeolocationServiceMock.prototype, 'getLocation')
        .and.callFake(() => Observable.of(geolocation));
      const decoderSpy = spyOn(GmapsGeocoderServiceMock.prototype, 'lookupPosition')
        .and.callFake(() => Observable.of(geoAddress).delay(300));

      comp.ngOnInit();
      fixture.detectChanges();

      expect(geoSpy).toHaveBeenCalled();
      expect(decoderSpy).toHaveBeenCalledWith(geolocation);
      expect(comp.loadingLocation).toEqual(false);
      expect(comp.searchQuery).toEqual(geoAddress[0].formatted_address);

      tick();
      expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent)
        .toEqual('Ange din position');
    });

    it('should fallback to manual search when GeoLocationService throws error', async () => {
      const geoSpy = spyOn(GeolocationServiceMock.prototype, 'getLocation')
        .and.callFake(() => Observable.throw({}).delay(300));

      comp.ngOnInit();
      fixture.detectChanges();
      tick();

      expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent)
        .toEqual('Ange din position');
    });
  });
});

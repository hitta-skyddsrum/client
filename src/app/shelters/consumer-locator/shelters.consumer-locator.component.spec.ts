import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { SheltersConsumerLocatorComponent } from 'app/shelters/consumer-locator/shelters.consumer-locator.component';
import { MdDialogModule, MdIconModule } from '@angular/material';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GmapsGeocoderService } from 'app/shared/gmaps-geocoder/gmaps-geocoder.service';
import { WindowRefService } from 'app/shelters/window-ref.services';

class GmapsGeocoderServiceMock {

}

class WindowMock {
  nativeWindow = {
    google: {
      maps: {
        Geocoder: function () {},
        places: {
          Autocomplete: function () {
            return {
              addListener: () => true
            }
          }
        },
      },
    },
  }
}

describe('SheltersConsumerLocatorComponent', () => {
  let comp: SheltersConsumerLocatorComponent;
  let fixture: ComponentFixture<SheltersConsumerLocatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SheltersConsumerLocatorComponent],
      imports: [MdIconModule, SharedModule, RouterTestingModule, MdDialogModule],
      providers: [
        {
          provide: GmapsGeocoderService,
          useClass: GmapsGeocoderServiceMock,
        },
        {
          provide: WindowRefService,
          useClass: WindowMock,
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SheltersConsumerLocatorComponent);
    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should initate the autocomplete', () => {
      const mockService = fixture.debugElement.injector.get(WindowRefService);
      const autocompleteMock = { addListener: () => true };
      const autocompleteAddListenerSpy = spyOn(autocompleteMock, 'addListener');
      const autocompleteSpy = spyOn(mockService.nativeWindow.google.maps.places, 'Autocomplete').and.returnValue(autocompleteMock);

      comp.ngOnInit();
      expect(autocompleteSpy).toHaveBeenCalledWith(comp.searchElemRef.nativeElement, {
        types: ['address'],
        componentRestrictions: {
          country: 'se'
        }
      });
      expect(autocompleteAddListenerSpy).toHaveBeenCalledWith('place_changed', jasmine.anything());
    });
  });

  fdescribe('section block', () => {
    let de;
    let el;

    beforeEach(() => {
      de = fixture.debugElement.query(By.css('section'));
      el = de.nativeElement;
    });

    it('should be hidden by default', () => {
      fixture.detectChanges();
      expect(el.hidden).toEqual(true);
    });

    it('should be visible when showSearchBar is true', () => {
      comp.showSearchBar = true;
      fixture.detectChanges();
      expect(de.properties.hidden).toEqual(false);
    });

    it('search box should have class showBouncer when showBouncer is true', () => {
      comp.showBouncer = true;
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('section'));
      let searchBox = de.query(By.css('.search_box'));
      expect(searchBox.classes.showBouncer).toEqual(true);
    });

    it('should retrieve placeholder from the placeholder property', () => {
      expect(true).toEqual(false);
    });
  });
});

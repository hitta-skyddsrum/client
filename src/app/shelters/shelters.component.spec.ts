import { FormsModule } from '@angular/forms';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { ApiService } from '../shared/api/api.service';
import { SheltersComponent } from './shelters.component';

export function main() {
  describe('Home component', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [SheltersComponent],
        providers: [
          { provide: ApiService, useValue: new MockApiService() }
        ]
      });

    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(SheltersComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;
            let mockApiService = <MockApiService>fixture.debugElement.injector.get(ApiService);
            let nameListServiceSpy = spyOn(mockApiService, 'get').and.callThrough();

            mockApiService.returnValue = ['1', '2', '3'];

            fixture.detectChanges();

            expect(homeInstance.nameListService).toEqual(jasmine.any(MockApiService));
            expect(homeDOMEl.querySelectorAll('li').length).toEqual(3);
            expect(nameListServiceSpy.calls.count()).toBe(1);

            homeInstance.newName = 'Minko';
            homeInstance.addName();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li').length).toEqual(4);
            expect(homeDOMEl.querySelectorAll('li')[3].textContent).toEqual('Minko');
          });

      }));
  });
}

class MockApiService {

  returnValue: string[];

  get(): Observable<string[]> {
    return Observable.create((observer: any) => {
      observer.next(this.returnValue);
      observer.complete();
    });
  }
}

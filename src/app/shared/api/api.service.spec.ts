import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Position } from '../../../models/position.model';

export function main() {
  describe('Api Service', () => {
    let nameListService: ApiService;
    let mockBackend: MockBackend;

    beforeEach(() => {

      TestBed.configureTestingModule({
        providers: [
          ApiService,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
            deps: [MockBackend, BaseRequestOptions]
          }
        ]
      });
    });

    it('should return an Observable when get called', async(() => {
      let position: Position = <Position> {
        lat: 0.0,
        long: 0.0,
      };
      expect(TestBed.get(ApiService).shelters().index(position)).toEqual(jasmine.any(Observable));
    }));

    it('should resolve to list of names when get called', async(() => {
      let apiService = TestBed.get(ApiService);
      let mockBackend = TestBed.get(MockBackend);
      let position: Position = <Position> {
        lat: 0.0,
        long: 0.0,
      };

      mockBackend.connections.subscribe((c: any) => {
        c.mockRespond(new Response(new ResponseOptions({ body: '["Dijkstra", "Hopper"]' })));
      });

      apiService.shelters().index(position).subscribe((data: any) => {
        expect(data).toEqual(['Dijkstra', 'Hopper']);
      });
    }));
  });
}

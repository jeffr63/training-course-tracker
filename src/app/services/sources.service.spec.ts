import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SourcesService } from './sources.service';
import { Source } from './sources';

const baseUrl = 'http://localhost:3000';

describe('SourcesService', () => {
  let httpTestingController: HttpTestingController;
  let service: SourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SourcesService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(SourcesService);
  });

  describe('load', () => {
    it('should return sources, with a get call to the correct URL', () => {
      const sources = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' },
      ];

      service.load().subscribe((data: Source[]) => {
        expect(data.length).toBe(2);
        expect(data).toEqual(sources);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/sources?_sort=name&_order=asc`);
      req.flush(sources);
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });
});

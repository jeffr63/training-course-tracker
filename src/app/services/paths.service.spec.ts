import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PathsService } from './paths.service';
import { Path } from './paths';

const baseUrl = 'http://localhost:3000';

describe('PathsService', () => {
  let httpTestingController: HttpTestingController;
  let service: PathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PathsService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(PathsService);
  });

  describe('load', () => {
    it('should return paths, with a get call to the correct URL', () => {
      const paths = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' },
      ];

      service.load().subscribe((data: Path[]) => {
        expect(data.length).toBe(2);
        expect(data).toEqual(paths);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/paths`);
      req.flush(paths);
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });
});

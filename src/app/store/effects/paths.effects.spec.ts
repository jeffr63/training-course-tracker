import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { empty } from 'rxjs';

import { Path } from '../../services/paths';
import { PathsEffects } from './paths.effects';
import { PathsService } from '../../services/paths.service';
import {
  Load, LoadFail, LoadSuccess
} from '../actions/paths.actions';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

class MockCoursesService {
  load = jasmine.createSpy('load');
}

describe(`Paths Effects`, () => {
  let actions$: TestActions;
  let effects: PathsEffects;
  let pathsService: MockCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PathsEffects,
        provideMockActions(() => actions$),
        { provide: PathsService, useClass: MockCoursesService },
        { provide: Actions, useFactory: getActions },
      ]
    });

    effects = TestBed.get(PathsEffects);
    pathsService = TestBed.get(PathsService);
    actions$ = TestBed.get(Actions);
  });

  describe(`loadPaths$ effect`, () => {
    it(`should return LoadSuccess, with paths, on success`, () => {
      const paths = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];

      const action = new Load();
      const completion = new LoadSuccess(paths);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: paths });
      const expected = cold('--c', { c: completion });
      pathsService.load.and.returnValue(response);

      expect(effects.loadPaths$).toBeObservable(expected);
    });

    it(`should return LoadFail, with error, on failure`, () => {
      const error = 'Error';
      const action = new Load();
      const completion = new LoadFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      pathsService.load.and.returnValue(response);

      expect(effects.loadPaths$).toBeObservable(expected);
    });
  });
});

import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { empty } from 'rxjs';

import { Source } from '../../services/sources';
import { SourcesEffects } from './sources.effects';
import { SourcesService } from '../../services/sources.service';
import {
  Load, LoadFail, LoadSuccess
} from '../actions/sources.actions';

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

describe(`Sources Effects`, () => {
  let actions$: TestActions;
  let effects: SourcesEffects;
  let sourcesService: MockCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SourcesEffects,
        provideMockActions(() => actions$),
        { provide: SourcesService, useClass: MockCoursesService },
        { provide: Actions, useFactory: getActions },
      ]
    });

    effects = TestBed.get(SourcesEffects);
    sourcesService = TestBed.get(SourcesService);
    actions$ = TestBed.get(Actions);
  });

  describe(`loadSource$ effect`, () => {
    it(`should return LoadSuccess, with paths, on success`, () => {
      const sources = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];

      const action = new Load();
      const completion = new LoadSuccess(sources);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: sources });
      const expected = cold('--c', { c: completion });
      sourcesService.load.and.returnValue(response);

      expect(effects.loadSources$).toBeObservable(expected);
    });

    it(`should return LoadFail, with error, on failure`, () => {
      const error = 'Error';
      const action = new Load();
      const completion = new LoadFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      sourcesService.load.and.returnValue(response);

      expect(effects.loadSources$).toBeObservable(expected);
    });
  });
});

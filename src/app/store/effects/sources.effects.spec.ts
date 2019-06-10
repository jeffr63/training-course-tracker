import { Source } from './../../shared/sources';
import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold, addMatchers, initTestScheduler, getTestScheduler, resetTestScheduler } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as sourcesActions from '../actions/sources.actions';
import { SourcesEffects } from './sources.effects';
import { SourcesService } from '../../services/sources.service';

class MockCoursesService {
  delete = jasmine.createSpy('delete');
  get = jasmine.createSpy('get');
  load = jasmine.createSpy('load');
  save = jasmine.createSpy('save');
}

// work around to issue with Jasmine and Angular 8 - was not initializing and marbles was failing
jasmine.getEnv().beforeAll(() => {
  return addMatchers();
});

jasmine.getEnv().beforeEach(() => {
  initTestScheduler();
});

jasmine.getEnv().afterEach(() => {
  getTestScheduler().flush();
  resetTestScheduler();
});
// -----------------------------------------------------------------------------------------------

describe(`Sources Effects`, () => {
  let actions$: Observable<any>;
  let effects: SourcesEffects;
  let sourcesService: MockCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SourcesEffects,
        provideMockActions(() => actions$),
        { provide: SourcesService, useClass: MockCoursesService },
      ]
    });

    effects = TestBed.get(SourcesEffects);
    sourcesService = TestBed.get(SourcesService);
  });

  describe(`deleteSource$ effect`, () => {
    it(`should return DeleteSourceSuccess, with id, on success`, () => {
      const action = sourcesActions.deleteSource({ id: 1 });
      const completion = sourcesActions.deleteSourceSuccess({ id: 1 });

      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: 1 });
      const expected = cold('--c', { c: completion });
      sourcesService.delete.and.returnValue(response);

      expect(effects.deleteSource$).toBeObservable(expected);
    });

    it(`should return DeleteSourceFail, with error, on failure`, () => {
      const error = 'Error';
      const action = sourcesActions.deleteSource({ id: 1 });
      const completion = sourcesActions.deleteSourceFail({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      sourcesService.delete.and.returnValue(response);

      expect(effects.deleteSource$).toBeObservable(expected);
    });
  });

  describe(`getSource$ effect`, () => {
    it(`should return GetSourceSuccess, with source, on success`, () => {
      const source: Source = { id: 1, name: 'ABC' };

      const action = sourcesActions.getSource({ id: 1 });
      const completion = sourcesActions.getSourceSuccess({ source });

      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: source });
      const expected = cold('--c', { c: completion });
      sourcesService.get.and.returnValue(response);

      expect(effects.getSource$).toBeObservable(expected);
    });

    it(`should return GetSourceFail, with error, on failure`, () => {
      const error = 'Error';
      const action = sourcesActions.getSource({ id: 1 });
      const completion = sourcesActions.getSourceFail({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      sourcesService.get.and.returnValue(response);

      expect(effects.getSource$).toBeObservable(expected);
    });
  });

  describe(`loadSource$ effect`, () => {
    it(`should return LoadSuccess, with sources, on success`, () => {
      const sources: Source[] = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];

      const action = sourcesActions.loadSources();
      const completion = sourcesActions.loadSourcesSuccess({ sources });

      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: sources });
      const expected = cold('--c', { c: completion });
      sourcesService.load.and.returnValue(response);

      expect(effects.loadSources$).toBeObservable(expected);
    });

    it(`should return LoadFail, with error, on failure`, () => {
      const error = 'Error';
      const action = sourcesActions.loadSources();
      const completion = sourcesActions.loadSourcesFail({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      sourcesService.load.and.returnValue(response);

      expect(effects.loadSources$).toBeObservable(expected);
    });
  });

  describe(`saveSource$ effect`, () => {
    it(`should return SaveSuccess, with source, on success`, () => {
      const source: Source = { id: 1, name: 'ABC' };

      const action = sourcesActions.saveSource({ source });
      const load = sourcesActions.loadSources();
      const completion = sourcesActions.saveSourceSuccess({ source });

      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: source });
      const expected = cold('--(cd)', { c: load, d: completion });
      sourcesService.save.and.returnValue(response);

      expect(effects.saveSource$).toBeObservable(expected);
    });

    it(`should return SaveFail, with error, on failure`, () => {
      const source: Source = { id: 1, name: 'ABC' };
      const error = 'Error';
      const action = sourcesActions.saveSource({ source });
      const completion = sourcesActions.saveSourceFail({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      sourcesService.save.and.returnValue(response);

      expect(effects.saveSource$).toBeObservable(expected);
    });
  });
});

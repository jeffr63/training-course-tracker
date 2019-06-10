import { Path } from './../../shared/paths';
import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as pathsActions from '../actions/paths.actions';
import { PathsEffects } from './paths.effects';
import { PathsService } from '../../services/paths.service';

class MockPathsService {
  delete = jasmine.createSpy('delete');
  get = jasmine.createSpy('get');
  load = jasmine.createSpy('load');
  save = jasmine.createSpy('save');
}

describe(`Paths Effects`, () => {
  let actions$: Observable<any>;
  let effects: PathsEffects;
  let pathsService: MockPathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PathsEffects,
        provideMockActions(() => actions$),
        { provide: PathsService, useClass: MockPathsService }
      ]
    });

    effects = TestBed.get(PathsEffects);
    pathsService = TestBed.get(PathsService);
  });

  describe(`deletePath$ effect`, () => {
    it(`should return DeleteSuccess, with id, on success`, () => {
      const action = pathsActions.deletePath({ id: 1 });
      const completion = pathsActions.deletePathSuccess({ id: 1 });

      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: 1 });
      const expected = cold('--c', { c: completion });
      pathsService.delete.and.returnValue(response);

      expect(effects.deletePath$).toBeObservable(expected);
    });

    it(`should return DeleteFail, with error, on failure`, () => {
      const error = 'Error';
      const action = pathsActions.deletePath({ id: 1 });
      const completion = pathsActions.deletePathFail({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      pathsService.delete.and.returnValue(response);

      expect(effects.deletePath$).toBeObservable(expected);
    });
  });

  describe(`getPath$ effect`, () => {
    it(`should return GetSuccess, with path, on success`, () => {
      const path: Path = { id: 1, name: 'ABC' };

      const action = pathsActions.getPath({ id: 1 });
      const completion = pathsActions.getPathSuccess({ path });

      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: path });
      const expected = cold('--c', { c: completion });
      pathsService.get.and.returnValue(response);

      expect(effects.getPath$).toBeObservable(expected);
    });

    it(`should return GetFail, with error, on failure`, () => {
      const error = 'Error';
      const action = pathsActions.getPath({ id: 1 });
      const completion = pathsActions.getPathFail({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      pathsService.get.and.returnValue(response);

      expect(effects.getPath$).toBeObservable(expected);
    });
  });

  describe(`loadPaths$ effect`, () => {
    it(`should return LoadSuccess, with paths, on success`, () => {
      const paths = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];

      const action = pathsActions.loadPaths();
      const completion = pathsActions.loadPathsSuccess({ paths });

      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: paths });
      const expected = cold('--c', { c: completion });
      pathsService.load.and.returnValue(response);

      expect(effects.loadPaths$).toBeObservable(expected);
    });

    it(`should return LoadFail, with error, on failure`, () => {
      const error = 'Error';
      const action = pathsActions.loadPaths();
      const completion = pathsActions.loadPathsFail({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      pathsService.load.and.returnValue(response);

      expect(effects.loadPaths$).toBeObservable(expected);
    });
  });

  describe(`savePath$ effect`, () => {
    it(`should return SaveSuccess, with path, on success`, () => {
      const path: Path = { id: 1, name: 'ABC' };

      const action = pathsActions.savePath({ path });
      const load = pathsActions.loadPaths();
      const completion = pathsActions.savePathSuccess({ path });

      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: path });
      const expected = cold('--(cd)', { c: load, d: completion });
      pathsService.save.and.returnValue(response);

      expect(effects.savePath$).toBeObservable(expected);
    });

    it(`should return SaveFail, with error, on failure`, () => {
      const path: Path = { id: 1, name: 'ABC' };
      const error = 'Error';
      const action = pathsActions.savePath({ path });
      const completion = pathsActions.savePathFail({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      pathsService.save.and.returnValue(response);

      expect(effects.savePath$).toBeObservable(expected);
    });
  });
});

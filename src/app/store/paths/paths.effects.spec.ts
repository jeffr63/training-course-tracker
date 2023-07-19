import { of, skip, take } from 'rxjs';

import { pathsActions } from './paths.actions';
import { pathsEffects } from './paths.effects';
import { PathsService } from '@services/paths.service';

const path = { id: 1, name: 'ABC' };

const paths = [
  { id: 1, name: 'ABC' },
  { id: 2, name: 'DEF' },
];

// TODO: create test for failing effects

describe(`Paths Effects`, () => {
  describe(`deletePath$ effect`, () => {
    it(`should return deletePathSuccess, with id, on success`, (done) => {
      const pathServiceMock = {
        delete: (id) => of(1),
      } as unknown as PathsService;
      const action$ = of(pathsActions.deletePath({ id: 1 }));
      pathsEffects.deletePath$(action$, pathServiceMock).subscribe((action) => {
        expect(action).toEqual(pathsActions.deletePathSuccess({ id: 1 }));
      });
      done();
    });
  });

  describe(`getPath$ effect`, () => {
    it(`should return getPathSuccess, with path, on success`, (done) => {
      const pathServiceMock = {
        get: (id) => of(path),
      } as unknown as PathsService;
      const action$ = of(pathsActions.getPath({ id: 1 }));
      pathsEffects.getPath$(action$, pathServiceMock).subscribe((action) => {
        expect(action).toEqual(pathsActions.getPathSuccess({ path }));
      });
      done();
    });
  });

  describe(`loadPaths$ effect`, () => {
    it(`should return LoadSuccess, with paths, on success`, () => {
      const pathServiceMock = {
        load: () => of(paths),
      } as unknown as PathsService;
      const action$ = of(pathsActions.loadPaths());
      pathsEffects.loadPaths$(action$, pathServiceMock).subscribe((action) => {
        expect(action).toEqual(pathsActions.loadPathsSuccess({ paths }));
      });
    });
  });

  describe(`savePath$ effect`, () => {
    it(`should return SaveSuccess, with path, on success`, (done) => {
      const pathServiceMock = {
        save: () => of(path),
      } as unknown as PathsService;
      const action$ = of(pathsActions.savePath({ path }));
      pathsEffects
        .savePath$(action$, pathServiceMock)
        .pipe(take(1))
        .subscribe((action) => {
          expect(action).toEqual(pathsActions.loadPaths());
        });
      pathsEffects
        .savePath$(action$, pathServiceMock)
        .pipe(skip(1))
        .subscribe((action) => {
          expect(action).toEqual(pathsActions.savePathSuccess({ path }));
        });
      done();
    });
  });
});

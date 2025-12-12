import { describe, it, expect } from 'vitest';

import { of, skip, take, throwError } from 'rxjs';

import { pathsActions } from './paths.actions';
import { pathsEffects } from './paths.effects';
import { PathsData } from '@shared/services/path/paths-data';

const path = { id: 1, name: 'ABC' };

const paths = [
  { id: 1, name: 'ABC' },
  { id: 2, name: 'DEF' },
];

describe(`Paths Effects`, () => {
  describe(`deletePath$ effect`, () => {
    it(`should return deletePathSuccess, with id, on success`, async () => {
      const pathServiceMock = {
        delete: (id) => of(1),
      } as unknown as PathsData;
      const action$ = of(pathsActions.deletePath({ id: 1 }));
      pathsEffects.deletePath$(action$, pathServiceMock).subscribe((action) => {
        expect(action).toEqual(pathsActions.deletePathSuccess({ id: 1 }));
      });
    });

    it(`should return deletePathFailure, with error, on failure`, async () => {
      const pathServiceMock = {
        delete: () => throwError(() => 'Failure'),
      } as unknown as PathsData;
      const action$ = of(pathsActions.deletePath({ id: 1 }));
      pathsEffects.deletePath$(action$, pathServiceMock).subscribe((action) => {
        expect(action).toEqual(pathsActions.deletePathFailure({ error: 'Failure' }));
      });
    });
  });

  describe(`getPath$ effect`, () => {
    it(`should return getPathSuccess, with path, on success`, async () => {
      const pathServiceMock = {
        get: (id) => of(path),
      } as unknown as PathsData;
      const action$ = of(pathsActions.getPath({ id: 1 }));
      pathsEffects.getPath$(action$, pathServiceMock).subscribe((action) => {
        expect(action).toEqual(pathsActions.getPathSuccess({ path }));
      });
    });

    it(`should return getPathFailure, with error, on failure`, async () => {
      const pathServiceMock = {
        get: () => throwError(() => 'Failure'),
      } as unknown as PathsData;
      const action$ = of(pathsActions.getPath({ id: 1 }));
      pathsEffects.getPath$(action$, pathServiceMock).subscribe((action) => {
        expect(action).toEqual(pathsActions.getPathFailure({ error: 'Failure' }));
      });
    });
  });

  describe(`loadPaths$ effect`, () => {
    it(`should return loadPathSuccess, with paths, on success`, () => {
      const pathServiceMock = {
        load: () => of(paths),
      } as unknown as PathsData;
      const action$ = of(pathsActions.loadPaths());
      pathsEffects.loadPaths$(action$, pathServiceMock).subscribe((action) => {
        expect(action).toEqual(pathsActions.loadPathsSuccess({ paths }));
      });
    });

    it(`should return loadPathFailure, with error, on failure`, async () => {
      const pathServiceMock = {
        load: () => throwError(() => 'Failure'),
      } as unknown as PathsData;
      const action$ = of(pathsActions.loadPaths());
      pathsEffects.loadPaths$(action$, pathServiceMock).subscribe((action) => {
        expect(action).toEqual(pathsActions.loadPathsFailure({ error: 'Failure' }));
      });
    });
  });

  describe(`savePath$ effect`, () => {
    it(`should return savePathSuccess, with path, on success`, async () => {
      const pathServiceMock = {
        save: () => of(path),
      } as unknown as PathsData;
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
    });

    it(`should return savePathFailure, with error, on failure`, async () => {
      const pathServiceMock = {
        save: () => throwError(() => 'Failure'),
      } as unknown as PathsData;
      const action$ = of(pathsActions.savePath({ path }));
      pathsEffects.savePath$(action$, pathServiceMock).subscribe((action) => {
        expect(action).toEqual(pathsActions.savePathFailure({ error: 'Failure' }));
      });
    });
  });
});

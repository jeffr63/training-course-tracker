import { pathsActions } from './paths.actions';

describe('Paths Actions', () => {
  describe('DeletePath', () => {
    it(`should create an action`, () => {
      const id = 1;
      const action = pathsActions.deletePath({ id });

      expect({ ...action }).toEqual({
        type: '[Paths] Delete Path',
        id,
      });
    });
  });

  describe('DeletePathFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = pathsActions.deletePathFailure({ error });

      expect({ ...action }).toEqual({
        type: '[Paths] Delete Path Fail',
        error,
      });
    });
  });

  describe('DeletePathSuccess', () => {
    it(`should create an action`, () => {
      const id = 1;
      const action = pathsActions.deletePathSuccess({ id });

      expect({ ...action }).toEqual({
        type: '[Paths] Delete Path Success',
        id,
      });
    });
  });

  describe('GetPath', () => {
    it(`should create an action`, () => {
      const id = 1;
      const action = pathsActions.getPath({ id });

      expect({ ...action }).toEqual({
        type: '[Paths] Get Path',
        id,
      });
    });
  });

  describe('GetPathFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = pathsActions.getPathFailure({ error });

      expect({ ...action }).toEqual({
        type: '[Paths] Get Path Fail',
        error,
      });
    });
  });

  describe('GetPathSuccess', () => {
    it(`should create an action`, () => {
      const path = { id: 1, name: 'ABC' };
      const action = pathsActions.getPathSuccess({ path });

      expect({ ...action }).toEqual({
        type: '[Paths] Get Path Success',
        path,
      });
    });
  });

  describe('LoadPaths', () => {
    it(`should create an action`, () => {
      const action = pathsActions.loadPaths();

      expect({ ...action }).toEqual({
        type: '[Paths] Load Paths',
      });
    });
  });

  describe('LoadPathsFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = pathsActions.loadPathsFailure({ error });

      expect({ ...action }).toEqual({
        type: '[Paths] Load Paths Fail',
        error,
      });
    });
  });

  describe('LoadPathsSuccess', () => {
    it(`should create an action`, () => {
      const paths = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' },
      ];
      const action = pathsActions.loadPathsSuccess({ paths });

      expect({ ...action }).toEqual({
        type: '[Paths] Load Paths Success',
        paths,
      });
    });
  });

  describe('SavePath', () => {
    it(`should create an action`, () => {
      const path = { id: 1, name: 'ABC' };
      const action = pathsActions.savePath({ path });

      expect({ ...action }).toEqual({
        type: '[Paths] Save Path',
        path,
      });
    });
  });

  describe('SavePathFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = pathsActions.savePathFailure({ error });

      expect({ ...action }).toEqual({
        type: '[Paths] Save Path Fail',
        error,
      });
    });
  });

  describe('SavePathSuccess', () => {
    it(`should create an action`, () => {
      const path = { id: 1, name: 'ABC' };
      const action = pathsActions.savePathSuccess({ path });

      expect({ ...action }).toEqual({
        type: '[Paths] Save Path Success',
        path,
      });
    });
  });
});

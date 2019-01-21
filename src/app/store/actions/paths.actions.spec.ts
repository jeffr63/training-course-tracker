import * as fromActions from './paths.actions';

describe('Paths Actions', () => {

  describe('Load', () => {
    it(`should create an action`, () => {
      const action = new fromActions.Load();

      expect(action.type).toEqual(fromActions.PathsActionTypes.LOAD);
    });
  });

  describe('LoadFail', () => {
    it(`should create an action`, () => {
      const payload = 'Error';
      const action = new fromActions.LoadFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.PathsActionTypes.LOAD_FAIL,
        payload
      });
    });
  });

  describe('LoadSuccess', () => {
    it(`should create an action`, () => {
      const payload = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];
      const action = new fromActions.LoadSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.PathsActionTypes.LOAD_SUCCESS,
        payload
      });
    });
  });
});

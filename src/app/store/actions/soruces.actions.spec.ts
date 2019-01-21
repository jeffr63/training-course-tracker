import * as fromActions from './sources.actions';

describe('Sources Actions', () => {
  describe('GetSources', () => {
    it(`should create an action`, () => {
      const action = new fromActions.Load();

      expect(action.type).toEqual(fromActions.SourcesActionTypes.LOAD);
    });
  });

  describe('GetSourcesFail', () => {
    it(`should create an action`, () => {
      const payload = 'Error';
      const action = new fromActions.LoadFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.SourcesActionTypes.LOAD_FAIL,
        payload
      });
    });
  });

  describe('GetSourcesSuccess', () => {
    it(`should create an action`, () => {
      const payload = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];
      const action = new fromActions.LoadSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.SourcesActionTypes.LOAD_SUCCESS,
        payload
      });
    });
  });
});

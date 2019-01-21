import { reducer, initialState, getSources } from './sources.reducer';
import * as fromActions from '../actions/sources.actions';
import { Source } from '../../services/sources';

describe('Sources Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });

    describe(`LOAD_FAIL action`, () => {
      it(`should clear sources and set error`, () => {
        const action = new fromActions.LoadFail('Error');
        const state = reducer(initialState, action);

        expect(state.sources).toEqual([]);
        expect(state.error).toEqual('Error');
      });
    });

    describe(`LOAD_SUCCESS action`, () => {
      it(`should populate sources from the array and clear error`, () => {
        const sources: Source[] = [
          { id: 1, name: 'ABC' },
          { id: 2, name: 'DEF' }
        ];
        const action = new fromActions.LoadSuccess(sources);
        const state = reducer(initialState, action);

        expect(state.sources).toEqual(sources);
        expect(state.error).toEqual('');
      });
    });
  });

  describe(`Sources Reducer Selectors`, () => {
    describe(`getSources selector`, () => {
      it('should return sources', () => {
        const sources: Source[] = [
          { id: 1, name: 'ABC' },
          { id: 2, name: 'DEF' }
        ];
        const previousState = {
          ...initialState,
          sources
        };

        const payload = getSources(previousState);

        expect(payload).toEqual(sources);
      });
    });
  });
});

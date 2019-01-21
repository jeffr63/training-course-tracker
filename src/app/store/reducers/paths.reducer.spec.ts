import { reducer, initialState, getPaths } from './paths.reducer';
import * as fromActions from '../actions/paths.actions';
import { Path } from '../../services/paths';

describe('Paths Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });

    describe(`LOAD_FAIL action`, () => {
      it(`should clear paths and set error`, () => {
        const action = new fromActions.LoadFail('Error');
        const state = reducer(initialState, action);

        expect(state.paths).toEqual([]);
        expect(state.error).toEqual('Error');
      });
    });

    describe(`LOAD_SUCCESS action`, () => {
      it(`should populate paths from the array and clear error`, () => {
        const paths: Path[] = [
          { id: 1, name: 'ABC' },
          { id: 2, name: 'DEF' }
        ];
        const action = new fromActions.LoadSuccess(paths);
        const state = reducer(initialState, action);

        expect(state.paths).toEqual(paths);
        expect(state.error).toEqual('');

      });
    });
  });

  describe(`Paths Reducer Selectors`, () => {
    describe(`getPaths selector`, () => {
      it('should return paths', () => {
        const paths: Path[] = [
          { id: 1, name: 'ABC' },
          { id: 2, name: 'DEF' }
        ];
        const previousState = {
          ...initialState,
          paths
        };

        const payload = getPaths(previousState);

        expect(payload).toEqual(paths);
      });
    });
  });
});

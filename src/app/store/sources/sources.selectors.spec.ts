import * as fromSelector from './sources.selectors';
import * as fromSources from './sources.reducer';
import { Source } from '../../shared/sources';

describe(`Main Reducer Selectors`, () => {
  describe(`getSources selector`, () => {
    it('should return sources', () => {
      const sources: Source[] = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' },
      ];
      const previousState = {
        sources: {
          ...fromSources.initialState,
          sources,
        },
      };

      const payload = fromSelector.getSources(previousState);

      expect(payload).toEqual(sources);
    });
  });

  describe(`getCurrentSource selector`, () => {
    it('should return source', () => {
      const currentSource: Source = { id: 1, name: 'ABC' };
      const previousState = {
        sources: {
          ...fromSources.initialState,
          currentSource,
        },
      };

      const payload = fromSelector.getCurrentSource(previousState);

      expect(payload).toEqual(currentSource);
    });
  });
});

import { Source } from '@admin/sources/models/sources';
import { getCurrentSource, getError, getSources } from '@store/sources/sources.selectors';
import { initialState } from '@store/sources/sources.state';

describe(`Sources Selectors`, () => {
  describe(`getSources selector`, () => {
    it('should return sources', () => {
      const sources: Source[] = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' },
      ];
      const previousState = {
        sources: {
          ...initialState,
          sources,
        },
      };

      const payload = getSources(previousState);

      expect(payload).toEqual(sources);
    });
  });

  describe(`getCurrentSource selector`, () => {
    it('should return source', () => {
      const currentSource: Source = { id: 1, name: 'ABC' };
      const previousState = {
        sources: {
          ...initialState,
          currentSource,
        },
      };

      const payload = getCurrentSource(previousState);

      expect(payload).toEqual(currentSource);
    });
  });

  describe(`getError selector`, () => {
    it('should return error', () => {
      const error = 'Error';
      const previousState = {
        sources: {
          ...initialState,
          error,
        },
      };

      const payload = getError(previousState);
      expect(payload).toEqual(error);
    });
  });
});

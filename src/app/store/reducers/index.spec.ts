import { Path } from './../../services/paths';
import * as fromMain from './index';
import * as fromPaths from './paths.reducer';
import * as fromSources from './sources.reducer';
import { Source } from './../../services/sources';

describe(`Main Reducer Selectors`, () => {
  describe(`getPaths selector`, () => {
    it('should return paths', () => {
      const paths: Path[] = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];
      const previousState = {
        paths: {
          ...fromPaths.initialState,
          paths
        }
      };

      const payload = fromMain.getPaths(previousState);

      expect(payload).toEqual(paths);
    });
  });

  describe(`getCurrentPath selector`, () => {
    it('should return path', () => {
      const currentPath: Path = { id: 1, name: 'ABC' };
      const previousState = {
        paths: {
          ...fromPaths.initialState,
          currentPath
        }
      };

      const payload = fromMain.getCurrentPath(previousState);

      expect(payload).toEqual(currentPath);
    });
  });

  describe(`getSources selector`, () => {
    it('should return sources', () => {
      const sources: Source[] = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];
      const previousState = {
        sources: {
          ...fromSources.initialState,
          sources
        }
      };

      const payload = fromMain.getSources(previousState);

      expect(payload).toEqual(sources);
    });
  });

  describe(`getCurrentSource selector`, () => {
    it('should return source', () => {
      const currentSource: Source = { id: 1, name: 'ABC' };
      const previousState = {
        paths: {
          ...fromPaths.initialState,
          currentSource
        }
      };

      const payload = fromMain.getCurrentPath(previousState);

      expect(payload).toEqual(currentSource);
    });
  });
});

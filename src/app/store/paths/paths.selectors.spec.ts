import * as fromSelector from './paths.selectors';
import * as fromPaths from './paths.reducer';
import { Path } from '../../shared/paths';

describe(`Paths Reducer Selectors`, () => {

  describe(`getCurrentPath selector`, () => {
    it('should return path', () => {
      const currentPath: Path = { id: 1, name: 'ABC' };
      const previousState = {
        paths: {
          ...fromPaths.initialState,
          currentPath
        }
      };

      const payload = fromSelector.getCurrentPath(previousState);

      expect(payload).toEqual(currentPath);
    });
  });

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

      const payload = fromSelector.getPaths(previousState);

      expect(payload).toEqual(paths);
    });
  });
});

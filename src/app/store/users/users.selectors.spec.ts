import { User } from '../../shared/user';
import { getCurrentUser, getError, getUsers } from './users.selectors';
import { initialState } from './users.state';

describe(`Users Selectors`, () => {
  describe(`getUsers selector`, () => {
    it('should return users', () => {
      const sources: User[] = [
        { id: 1, name: 'Joe', email: 'joe@joe.com', password: 'abc', role: 'admin' },
        { id: 2, name: 'Sam', email: 'sam@joe.com', password: 'abc', role: 'user' },
      ];
      const previousState = {
        sources: {
          ...initialState,
          sources,
        },
      };

      const payload = getUsers(previousState);

      expect(payload).toEqual(sources);
    });
  });

  describe(`getCurrentUser selector`, () => {
    it('should return user', () => {
      const currentUser: User = { id: 1, name: 'Joe', email: 'joe@joe.com', password: 'abc', role: 'admin' };
      const previousState = {
        sources: {
          ...initialState,
          currentUser,
        },
      };

      const payload = getCurrentUser(previousState);

      expect(payload).toEqual(currentUser);
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

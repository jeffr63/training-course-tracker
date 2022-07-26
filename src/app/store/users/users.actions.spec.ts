import * as usersActions from '@store/users/users.actions';

describe('Users Actions', () => {
  describe('Delete User', () => {
    it(`should create an action`, () => {
      const id = 1;
      const action = usersActions.deleteUser({ id });

      expect({ ...action }).toEqual({
        type: '[Users] Delete User',
        id,
      });
    });
  });

  describe('DeleteUserFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = usersActions.deleteUserFail({ error });

      expect({ ...action }).toEqual({
        type: '[Users] Delete User Fail',
        error,
      });
    });
  });

  describe('DeleteUserSuccess', () => {
    it(`should create an action`, () => {
      const id = 1;
      const action = usersActions.deleteUserSuccess({ id });

      expect({ ...action }).toEqual({
        type: '[Users] Delete User Success',
        id,
      });
    });
  });

  describe('GetUser', () => {
    it(`should create an action`, () => {
      const id = 1;
      const action = usersActions.getUser({ id });

      expect({ ...action }).toEqual({
        type: '[Users] Get User',
        id,
      });
    });
  });

  describe('GetUserFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = usersActions.getUserFail({ error });

      expect({ ...action }).toEqual({
        type: '[Users] Get User Fail',
        error,
      });
    });
  });

  describe('GetUserSuccess', () => {
    it(`should create an action`, () => {
      const user = { id: 1, name: 'Joe', email: 'joe@joe.com', password: 'abc', role: 'admin' };
      const action = usersActions.getUserSuccess({ user });

      expect({ ...action }).toEqual({
        type: '[Users] Get User Success',
        user,
      });
    });
  });

  describe('LoadUsers', () => {
    it(`should create an action`, () => {
      const action = usersActions.loadUsers();

      expect({ ...action }).toEqual({
        type: '[Users] Load Users',
      });
    });
  });

  describe('LoadUserFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = usersActions.loadUsersFail({ error });

      expect({ ...action }).toEqual({
        type: '[Users] Load Users Fail',
        error,
      });
    });
  });

  describe('LoadUsersSuccess', () => {
    it(`should create an action`, () => {
      const users = [
        { id: 1, name: 'Joe', email: 'joe@joe.com', password: 'abc', role: 'admin' },
        { id: 2, name: 'Sam', email: 'sam@joe.com', password: 'abc', role: 'user' },
      ];
      const action = usersActions.loadUsersSuccess({ users });

      expect({ ...action }).toEqual({
        type: '[Users] Load Users Success',
        users,
      });
    });
  });

  describe('PatchUser', () => {
    it(`should create an action`, () => {
      const user = { id: 1, name: 'Jim' };
      const action = usersActions.patchUser({ id: 1, user });

      expect({ ...action }).toEqual({
        type: '[Users] Patch User',
        id: 1,
        user,
      });
    });
  });

  describe('PatchUserFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = usersActions.patchUserFail({ error });

      expect({ ...action }).toEqual({
        type: '[Users] Patch User Fail',
        error,
      });
    });
  });

  describe('PatchUserSuccess', () => {
    it(`should create an action`, () => {
      const user = { id: 1, name: 'Jim', email: 'jim@jim.com', password: 'abc', role: 'admin' };
      const action = usersActions.patchUserSuccess({ user });

      expect({ ...action }).toEqual({
        type: '[Users] Patch User Success',
        user,
      });
    });
  });
});

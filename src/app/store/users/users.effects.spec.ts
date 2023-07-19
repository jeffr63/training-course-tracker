import { of, skip, take } from 'rxjs';

import { usersActions } from './users.actions';
import { usersEffects } from './users.effects';
import { UsersService } from '@services/user.service';
import { User } from '@models/user';

const user = { id: 1, name: 'Joe', email: 'joe@joe.com', password: 'abc', role: 'admin' };

const users: User[] = [
  { id: 1, name: 'Joe', email: 'joe@joe.com', password: 'abc', role: 'admin' },
  { id: 2, name: 'Sam', email: 'sam@joe.com', password: 'abc', role: 'user' },
];

// TODO: create test for failing effects

describe(`Users Effects`, () => {
  describe(`deleteUser$ effect`, () => {
    it(`should return deleteUserSuccess, with id, on success`, (done) => {
      const userServiceMock = {
        delete: (id) => of(id),
      } as unknown as UsersService;
      const action$ = of(usersActions.deleteUser({ id: 1 }));
      usersEffects.deleteUser$(action$, userServiceMock).subscribe((action) => {
        expect(action).toEqual(usersActions.deleteUserSuccess({ id: 1 }));
      });
      done();
    });
  });

  describe(`getUser$ effect`, () => {
    it(`should return getUserSuccess, with user, on success`, (done) => {
      const userServiceMock = {
        get: (id) => of(user),
      } as unknown as UsersService;
      const action$ = of(usersActions.getUser({ id: 1 }));
      usersEffects.getUser$(action$, userServiceMock).subscribe((action) => {
        expect(action).toEqual(usersActions.getUserSuccess({ user }));
      });
      done();
    });
  });

  describe(`loadUsers$ effect`, () => {
    it(`should return LoadUsersSuccess, with sources, on success`, () => {
      const userServiceMock = {
        load: () => of(users),
      } as unknown as UsersService;
      const action$ = of(usersActions.loadUsers());
      usersEffects.loadUsers$(action$, userServiceMock).subscribe((action) => {
        expect(action).toEqual(usersActions.loadUsersSuccess({ users }));
      });
    });
  });

  describe(`patchUser$ effect`, () => {
    it(`should return PatchUsersSuccess, with user, on success`, (done) => {
      const userServiceMock = {
        patch: () => of(user),
      } as unknown as UsersService;
      const action$ = of(usersActions.patchUser({ id: 1, user }));
      usersEffects
        .patchUser$(action$, userServiceMock)
        .pipe(take(1))
        .subscribe((action) => {
          expect(action).toEqual(usersActions.loadUsers());
        });
      usersEffects
        .patchUser$(action$, userServiceMock)
        .pipe(skip(1))
        .subscribe((action) => {
          expect(action).toEqual(usersActions.patchUserSuccess({ user }));
        });
      done();
    });
  });
});

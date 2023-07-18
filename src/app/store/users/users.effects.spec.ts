import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { usersActions as usersActions } from './users.actions';
import { User } from '@models/user';
import { usersEffects } from './users.effects';
import { UsersService } from '@services/user.service';
import { State, initialState } from './users.state';

const usersService = jasmine.createSpyObj('usersService', ['delete', 'get', 'load', 'patch']);

describe(`User Effects`, () => {
  let actions$: Observable<any>;
  let effects = usersEffects;
  let store: MockStore<State>;
  let testScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
        { provide: UsersService, useValue: usersService },
      ],
    });

    //effects = TestBed.inject(UsersEffects);
    store = TestBed.inject(MockStore);
    store.setState(initialState);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe(`deleteUser$ effect`, () => {
    it(`should return DeleteUserSuccess, with id, on success`, () => {
      const action = usersActions.deleteUser({ id: 1 });
      const completion = usersActions.deleteUserSuccess({ id: 1 });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: 1 });
        usersService.delete.and.returnValue(response);

        expectObservable(effects.deleteUser$).toBe('--c', { c: completion });
      });
    });

    it(`should return DeleteSourceFailure, with error, on failure`, () => {
      const error = 'Error';
      const action = usersActions.deleteUser({ id: 1 });
      const completion = usersActions.deleteUserFailure({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        usersService.delete.and.returnValue(response);

        expectObservable(effects.deleteUser$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`getUser$ effect`, () => {
    it(`should return GetUserSuccess, with user, on success`, () => {
      const user: User = { id: 1, name: 'Joe', email: 'joe@joe.com', password: 'abc', role: 'admin' };

      const action = usersActions.getUser({ id: 1 });
      const completion = usersActions.getUserSuccess({ user });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: user });
        usersService.get.and.returnValue(response);

        expectObservable(effects.getUser$).toBe('--c', { c: completion });
      });
    });

    it(`should return GetUserFailure, with error, on failure`, () => {
      const error = 'Error';
      const action = usersActions.getUser({ id: 1 });
      const completion = usersActions.getUserFailure({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        usersService.get.and.returnValue(response);

        expectObservable(effects.getUser$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`loadUsers$ effect`, () => {
    it(`should return LoadSuccess, with users, on success`, () => {
      const users: User[] = [
        { id: 1, name: 'Joe', email: 'joe@joe.com', password: 'abc', role: 'admin' },
        { id: 2, name: 'Sam', email: 'sam@joe.com', password: 'abc', role: 'user' },
      ];

      const action = usersActions.loadUsers();
      const completion = usersActions.loadUsersSuccess({ users });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: users });
        usersService.load.and.returnValue(response);

        expectObservable(effects.loadUsers$).toBe('--c', { c: completion });
      });
    });

    it(`should return LoadFailure, with error, on failure`, () => {
      const error = 'Error';
      const action = usersActions.loadUsers();
      const completion = usersActions.loadUsersFailure({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        usersService.load.and.returnValue(response);

        expectObservable(effects.loadUsers$).toBe('--b', { b: completion });
      });
    });
  });

  // TODO: figure out how to test the patchUser effect
  // describe(`patchUser$ effect`, () => {
  //   it(`should return SaveSuccess, with user, on success`, () => {
  //     const user: User = { id: 1, name: 'Jim', email: 'joe@joe.com', password: 'abc', role: 'admin' };

  //     const action = userActions.patchUser({ id: 1, user });
  //     const load = userActions.loadUsers();
  //     const completion = userActions.patchUserSuccess({ user });

  //     testScheduler.run(({ hot, cold, expectObservable }) => {
  //       actions$ = hot('-a', { a: action });
  //       const response = cold('-b|', { b: load });
  //       usersService.patch.and.returnValue(response);

  //       expectObservable(effects.patchUser$).toBe('--(cd)', { c: load, d: completion });
  //     });
  //   });

  //   it(`should return PathFailure, with error, on failure`, () => {
  //     const user: User = { id: 1, name: 'Jim', email: 'joe@joe.com', password: 'abc', role: 'admin' };
  //     const error = 'Error';
  //     const action = userActions.patchUser({ id: 1, user });
  //     const completion = userActions.patchUserFail({ error });

  //     testScheduler.run(({ hot, cold, expectObservable }) => {
  //       actions$ = hot('-a', { a: action });
  //       const response = cold('-#|', {}, error);
  //       usersService.save.and.returnValue(response);

  //       expectObservable(effects.patchUser$).toBe('--b', { b: completion });
  //     });
  //   });
  // });
});

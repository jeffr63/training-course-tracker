import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import * as userActions from './users.actions';
import { User } from '../../shared/user';
import { UsersEffects } from './users.effects';
import { UsersService } from '../../services/user.service';
import { State, initialState } from './users.state';

const usersService = jasmine.createSpyObj('usersService', ['get', 'load', 'patch']);

describe(`User Effects`, () => {
  let actions$: Observable<any>;
  let effects: UsersEffects;
  let store: MockStore<State>;
  let testScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
        { provide: UsersService, useValue: usersService },
      ],
    });

    effects = TestBed.inject(UsersEffects);
    store = TestBed.inject(MockStore);
    store.setState(initialState);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe(`deleteUser$ effect`, () => {
    it(`should return DeleteUserSuccess, with id, on success`, () => {
      const action = userActions.deleteUser({ id: 1 });
      const completion = userActions.deleteUserSuccess({ id: 1 });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: 1 });
        usersService.delete.and.returnValue(response);

        expectObservable(effects.deleteUser$).toBe('--c', { c: completion });
      });
    });

    it(`should return DeleteSourceFail, with error, on failure`, () => {
      const error = 'Error';
      const action = userActions.deleteUser({ id: 1 });
      const completion = userActions.deleteUserFail({ error });

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

      const action = userActions.getUser({ id: 1 });
      const completion = userActions.getUserSuccess({ user });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: user });
        usersService.get.and.returnValue(response);

        expectObservable(effects.getUser$).toBe('--c', { c: completion });
      });
    });

    it(`should return GetUserFail, with error, on failure`, () => {
      const error = 'Error';
      const action = userActions.getUser({ id: 1 });
      const completion = userActions.getUserFail({ error });

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

      const action = userActions.loadUsers();
      const completion = userActions.loadUsersSuccess({ users });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: users });
        usersService.load.and.returnValue(response);

        expectObservable(effects.loadUsers$).toBe('--c', { c: completion });
      });
    });

    it(`should return LoadFail, with error, on failure`, () => {
      const error = 'Error';
      const action = userActions.loadUsers();
      const completion = userActions.loadUsersFail({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        usersService.load.and.returnValue(response);

        expectObservable(effects.loadUsers$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`patchUser$ effect`, () => {
    it(`should return SaveSuccess, with source, on success`, () => {
      const user: User = { id: 1, name: 'Jim', email: 'joe@joe.com', password: 'abc', role: 'admin' };
      const id: number = 1;

      const action = userActions.patchUser({ id, user });
      const load = userActions.loadUsers();
      const completion = userActions.patchUserSuccess({ user });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: load });
        usersService.patch.and.returnValue(response);

        expectObservable(effects.patchUser$).toBe('--(cd)', { c: load, d: completion });
      });
    });

    it(`should return PathFail, with error, on failure`, () => {
      const user: User = { id: 1, name: 'Jim', email: 'joe@joe.com', password: 'abc', role: 'admin' };
      const id: number = 1;
      const error = 'Error';
      const action = userActions.patchUser({ id, user });
      const completion = userActions.patchUserFail({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        usersService.save.and.returnValue(response);

        expectObservable(effects.patchUser$).toBe('--b', { b: completion });
      });
    });
  });
});

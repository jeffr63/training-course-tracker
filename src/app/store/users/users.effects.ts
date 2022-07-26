import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';

import * as userActions from './users.actions';
import { User } from '../../admin/users/models/user';
import { UsersService } from '../../admin/users/services/user.service';

@Injectable()
export class UsersEffects {
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.deleteUser),
      switchMap(({ id }) =>
        this.usersService.delete(id).pipe(
          map(() => userActions.deleteUserSuccess({ id })),
          catchError((err) => of(userActions.deleteUserFail({ error: err })))
        )
      )
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getUser),
      concatMap(({ id }) =>
        this.usersService.get(id).pipe(
          map((user: User) => userActions.getUserSuccess({ user })),
          catchError((err) => of(userActions.getUserFail({ error: err })))
        )
      )
    )
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUsers),
      switchMap(() =>
        this.usersService.load().pipe(
          map((users: User[]) => userActions.loadUsersSuccess({ users })),
          catchError((err) => of(userActions.loadUsersFail({ error: err })))
        )
      )
    )
  );

  patchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.patchUser),
      concatMap(({ id, user }) =>
        this.usersService.patch(id, user).pipe(
          concatMap((res) => [userActions.loadUsers(), userActions.patchUserSuccess({ user: res })]),
          catchError((err) => of(userActions.patchUserFail({ error: err })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}

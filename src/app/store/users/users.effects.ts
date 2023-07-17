import { Injectable, inject } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';

import { usersActions } from './users.actions';
import { User } from '@models/user';
import { UsersService } from '@services/user.service';

@Injectable()
export class UsersEffects {
  private actions = inject(Actions);
  private usersService = inject(UsersService);

  deleteUser$ = createEffect(() =>
    this.actions.pipe(
      ofType(usersActions.deleteUser),
      switchMap(({ id }) =>
        this.usersService.delete(id).pipe(
          map(() => usersActions.deleteUserSuccess({ id })),
          catchError((err) => of(usersActions.deleteUserFailure({ error: err })))
        )
      )
    )
  );

  getUser$ = createEffect(() =>
    this.actions.pipe(
      ofType(usersActions.getUser),
      concatMap(({ id }) =>
        this.usersService.get(id).pipe(
          map((user: User) => usersActions.getUserSuccess({ user })),
          catchError((err) => of(usersActions.getUserFailure({ error: err })))
        )
      )
    )
  );

  loadUsers$ = createEffect(() =>
    this.actions.pipe(
      ofType(usersActions.loadUsers),
      switchMap(() =>
        this.usersService.load().pipe(
          map((users: User[]) => usersActions.loadUsersSuccess({ users })),
          catchError((err) => of(usersActions.loadUsersFailure({ error: err })))
        )
      )
    )
  );

  patchUser$ = createEffect(() =>
    this.actions.pipe(
      ofType(usersActions.patchUser),
      concatMap(({ id, user }) =>
        this.usersService.patch(id, user).pipe(
          concatMap((res) => [usersActions.loadUsers(), usersActions.patchUserSuccess({ user: res })]),
          catchError((err) => of(usersActions.patchUserFailure({ error: err })))
        )
      )
    )
  );
}

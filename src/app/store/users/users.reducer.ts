import { createReducer, on } from '@ngrx/store';

import * as usersActions from './users.actions';
import { initialState } from './users.state';

export const reducer = createReducer(
  initialState,
  on(usersActions.deleteUserFail, (state, { error }) => ({
    ...state,
    currentUser: null,
    error: error,
  })),
  on(usersActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    currentUser: null,
    error: '',
    users: state.users.filter((user) => user.id !== id),
  })),
  on(usersActions.getUserFail, (state, { error }) => ({
    ...state,
    currentUser: null,
    error: error,
  })),
  on(usersActions.getUserSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    error: '',
  })),
  on(usersActions.loadUsersFail, (state, { error }) => ({
    ...state,
    users: [],
    error: error,
  })),
  on(usersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
    error: '',
  })),
  on(usersActions.patchUserFail, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(usersActions.patchUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((item) => (user.id === item.id ? user : item)),
    currentSource: null,
    error: '',
  }))
);

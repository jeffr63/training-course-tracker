import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './users.state';

// sources selectors
export const selectUserState = createFeatureSelector<State>('users');

export const getCurrentUser = createSelector(selectUserState, (state: State) => state.currentUser);

export const getError = createSelector(selectUserState, (state: State) => state.error);

export const getUsers = createSelector(selectUserState, (state: State) => state.users);

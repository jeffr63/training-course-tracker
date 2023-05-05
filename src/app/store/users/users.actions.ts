import { props, createAction } from '@ngrx/store';

import { User } from '@models/user';

export const deleteUser = createAction('[Users] Delete User', props<{ id: number }>());

export const deleteUserFail = createAction('[Users] Delete User Fail', props<{ error: string }>());

export const deleteUserSuccess = createAction('[Users] Delete User Success', props<{ id: number }>());

export const getUser = createAction('[Users] Get User', props<{ id: number }>());

export const getUserFail = createAction('[Users] Get User Fail', props<{ error: string }>());

export const getUserSuccess = createAction('[Users] Get User Success', props<{ user: User }>());

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersFail = createAction('[Users] Load Users Fail', props<{ error: string }>());

export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{ users: User[] }>());

export const patchUser = createAction('[Users] Patch User', props<{ id: number; user: any }>());

export const patchUserFail = createAction('[Users] Patch User Fail', props<{ error: string }>());

export const patchUserSuccess = createAction('[Users] Patch User Success', props<{ user: User }>());

import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as courseReducer from '@store/course/course.reducer';
import * as courseState from '@store/course/course.state';
import * as pathsReducer from '@store/paths/paths.reducer';
import * as pathsState from '@store/paths/paths.state';
import * as sourcesReducer from '@store/sources/sources.reducer';
import * as sourcesState from '@store/sources/sources.state';
import * as usersReducer from '@store/users/users.reducer';
import * as usersState from '@store/users/users.state';

// import { environment } from '../../../environments/environment.prod';

export interface State {
  courses: courseState.State;
  paths: pathsState.State;
  sources: sourcesState.State;
  users: usersState.State;
}

export const reducers: ActionReducerMap<State> = {
  courses: courseReducer.reducer,
  paths: pathsReducer.reducer,
  sources: sourcesReducer.reducer,
  users: usersReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];
// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

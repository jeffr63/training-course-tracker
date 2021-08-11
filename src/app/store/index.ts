import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as fromCourses from './course/course.reducer';
import * as fromPaths from './paths/paths.reducer';
import * as fromSources from './sources/sources.reducer';

// import { environment } from '../../../environments/environment.prod';

export interface State {
  courses: fromCourses.State;
  paths: fromPaths.State;
  sources: fromSources.State;
}

export const reducers: ActionReducerMap<State> = {
  courses: fromCourses.reducer,
  paths: fromPaths.reducer,
  sources: fromSources.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];
// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

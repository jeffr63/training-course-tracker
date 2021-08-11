import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

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
  sources: fromSources.reducer
};

export const metaReducers: MetaReducer<State>[] = [];
// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

// course selectors
const getCourseFeatureState = createFeatureSelector<fromCourses.State>('courses');

export const getCourses = createSelector(
  getCourseFeatureState,
  state => state.courses
);

export const getCourse = createSelector(
  getCourseFeatureState,
  state => state.currentCourse
);

export const saveCourse = createSelector(
  getCourseFeatureState,
  state => state.currentCourse
);

export const getTotalCourses = createSelector(
  getCourseFeatureState,
  state => state.totalCourses
);

export const getCoursesByPath = createSelector(
  getCourseFeatureState,
  state => state.coursesByPath
);

export const getCoursesBySource = createSelector(
  getCourseFeatureState,
  state => state.coursesBySource
);

// paths selectors
export const selectPathsState = createFeatureSelector<fromPaths.State>('paths');
export const getPaths = createSelector(
  selectPathsState,
  fromPaths.getPaths
);

export const getCurrentPath = createSelector(
  selectPathsState,
  fromPaths.getCurrentPath
);

// sources selectors
export const selectSourcesState = createFeatureSelector<fromSources.State>('sources');
export const getSources = createSelector(
  selectSourcesState,
  fromSources.getSources
);

export const getCurrentSource = createSelector(
  selectSourcesState,
  fromSources.getCurrentSource
);

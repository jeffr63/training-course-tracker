import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromRoot from '../../../store/reducers';
import * as fromCourses from './course.reducer';

export interface CoursesState {
  courses: fromCourses.State;
}

export interface State extends fromRoot.State {
  courses: fromCourses.State;
}

export const reducers: ActionReducerMap<CoursesState> = {
  courses: fromCourses.reducer
};

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

import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../store/reducers';
import { CourseActionTypes, CourseActions } from '../state/course.actions';
import { Course } from '../course';

export interface State extends fromRoot.State {
  courses: CourseState;
}

export interface CourseState {
  courses: Course[];
  currentCourse: Course;
  totalCourses: number;
  error: string;
}

export const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  totalCourses: 0,
  error: '',
};

const getCourseFeatureState = createFeatureSelector<CourseState>('courses');

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

export function reducer(state = initialState, action: CourseActions): CourseState {
  switch (action.type) {
    case CourseActionTypes.DELETE_FAIL:
      return {
        ...state,
        error: action.payload
      };

    case CourseActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        error: ''
      };

    case CourseActionTypes.COURSE_FAIL:
      return {
        ...state,
        currentCourse: null,
        error: action.payload
      };

    case CourseActionTypes.COURSE_SUCCESS:
      return {
        ...state,
        currentCourse: action.payload,
        error: ''
      };

    case CourseActionTypes.LOAD_FAIL:
      return {
        ...state,
        courses: [],
        error: action.payload
      };

    case CourseActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        error: ''
      };

    case CourseActionTypes.SAVE_FAIL:
      return {
        ...state,
        error: action.payload
      };

    case CourseActionTypes.SAVE_SUCCESS:
      const updatedCourses = state.courses.map(
        item => action.payload.id === item.id ? action.payload : item);
      return {
        ...state,
        courses: updatedCourses,
        currentCourse: null,
        error: ''
      };

    case CourseActionTypes.TOTAL_FAIL:
      return {
        ...state,
        totalCourses: 0,
        error: action.payload
      };

    case CourseActionTypes.TOTAL_SUCCESS:
      return {
        ...state,
        totalCourses: action.payload.length,
        error: ''
      };
  }

  return state;
}

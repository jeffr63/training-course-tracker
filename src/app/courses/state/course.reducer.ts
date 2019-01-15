import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../state/app.state';
import { Course } from '../course';
import { CourseActions, CourseActionTypes } from '../state/course.actions';

export interface State extends fromRoot.State {
  courses: CourseState;
}

export interface CourseState {
  courses: Course[];
  currentCourse: Course;
  totalCourses: number;
  error: string;
  paths: any[];
  sources: any[];
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  totalCourses: 0,
  error: '',
  paths: [],
  sources: []
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

export const getPaths = createSelector(
  getCourseFeatureState,
  state => state.paths
);

export const getSource = createSelector(
  getCourseFeatureState,
  state => state.sources
);

export const saveCourse = createSelector(
  getCourseFeatureState,
  state => state.currentCourse
);

export const getTotalCourses = createSelector(
  getCourseFeatureState,
  state => state.totalCourses
);

export const lookupCoursePaths = createSelector(
  getCourseFeatureState,
  state => state.paths
);

export const lookupCourseSources = createSelector(
  getCourseFeatureState,
  state => state.sources
);

export function reducer(state = initialState, action: CourseActions): CourseState {
  switch (action.type) {
    case CourseActionTypes.DeleteCourseFail:
      return {
        ...state,
        error: action.payload
      };

    case CourseActionTypes.DeleteCourseSuccess:
      return {
        ...state,
        error: ''
      };

    case CourseActionTypes.GetCourseFail:
      return {
        ...state,
        currentCourse: null,
        error: action.payload
      };

    case CourseActionTypes.GetCourseSuccess:
      return {
        ...state,
        currentCourse: action.payload,
        error: ''
      };

    case CourseActionTypes.GetTotalCoursesFail:
      return {
        ...state,
        totalCourses: 0,
        error: ''
      };

    case CourseActionTypes.GetTotalCoursesSuccess:
      return {
        ...state,
        totalCourses: action.payload.length,
        error: ''
      };

    case CourseActionTypes.LoadCoursesFail:
      return {
        ...state,
        courses: [],
        error: action.payload
      };

    case CourseActionTypes.LoadCoursesSuccess:
      return {
        ...state,
        courses: action.payload,
        error: ''
      };

    case CourseActionTypes.LookupCoursePathsFail:
      return {
        ...state,
        paths: [],
        error: action.payload
      };

    case CourseActionTypes.LookupCoursePathsSuccess:
      return {
        ...state,
        paths: action.payload,
        error: ''
      };

    case CourseActionTypes.LookupCourseSourcesFail:
      return {
        ...state,
        sources: [],
        error: action.payload
      };

    case CourseActionTypes.LookupCourseSourcesSuccess:
      return {
        ...state,
        sources: action.payload,
        error: ''
      };

    case CourseActionTypes.SaveCourseFail:
      return {
        ...state,
        error: action.payload,
      };

    case CourseActionTypes.SaveCourseSuccess:
      const updatedCourses = state.courses.map(
        item => action.payload.id === item.id ? action.payload : item);
      return {
        ...state,
        courses: updatedCourses,
        currentCourse: null,
        error: ''
      };

    default:
      return state;
  }
}

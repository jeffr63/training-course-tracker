import { createFeatureSelector, createSelector, StateObservable } from '@ngrx/store';

import { Course } from '../course';
import * as fromRoot from '../../state/app.state';
import { CourseActions, CourseActionTypes } from '../state/course.actions';

export interface State extends fromRoot.State {
  courses: CourseState;
}

export interface CourseState {
  courses: Course[];
  currentCourse: Course;
  totalCourses: number;
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  totalCourses: 0
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

    case CourseActionTypes.DeleteCourseSuccess:
      return state;

    case CourseActionTypes.GetCourseSuccess:
      console.log(action.payload);
      return {
        ...state,
        currentCourse: action.payload
      };

    case CourseActionTypes.NewCourse:
      return {
        ...state,
        currentCourse: {
          id: 0,
          title: '',
          instructor: '',
          path: '',
          source: '',
          yearCompleted: ''
        }
      };

    case CourseActionTypes.SaveCourseSuccess:
      const updatedCourses = state.courses.map(
        item => action.payload.id === item.id ? action.payload : item);
      return {
        ...state,
        courses: updatedCourses,
        currentCourse: null
      };

    case CourseActionTypes.GetTotalCoursesSuccess:
      return {
        ...state,
        totalCourses: action.payload.length
      };

    case CourseActionTypes.LoadCoursesSuccess:
      return {
        ...state,
        courses: action.payload
      };

    default:
      return state;
  }
}

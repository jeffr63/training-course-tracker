import * as _ from 'lodash';

import * as fromCourses from '../actions/course.actions';
import { Course, CourseData } from '../../shared/course';

export interface State {
  courses: Course[];
  currentCourse: Course;
  totalCourses: number;
  coursesByPath: CourseData[];
  coursesBySource: CourseData[];
  error: string;
}

export const initialState: State = {
  courses: [],
  currentCourse: null,
  totalCourses: 0,
  coursesByPath: [],
  coursesBySource: [],
  error: '',
};

export function reducer(state = initialState, action: fromCourses.CourseActions): State {
  switch (action.type) {
    case fromCourses.CourseActionTypes.DELETE_FAIL:
      return {
        ...state,
        error: action.payload
      };

    case fromCourses.CourseActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        error: ''
      };

    case fromCourses.CourseActionTypes.COURSE_FAIL:
      return {
        ...state,
        currentCourse: null,
        error: action.payload
      };

    case fromCourses.CourseActionTypes.COURSE_SUCCESS:
      return {
        ...state,
        currentCourse: action.payload,
        error: ''
      };

    case fromCourses.CourseActionTypes.LOAD_FAIL:
      return {
        ...state,
        courses: [],
        error: action.payload
      };

    case fromCourses.CourseActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        error: ''
      };

    case fromCourses.CourseActionTypes.SAVE_FAIL:
      return {
        ...state,
        error: action.payload
      };

    case fromCourses.CourseActionTypes.SAVE_SUCCESS:
      const updatedCourses = state.courses.map(
        item => action.payload.id === item.id ? action.payload : item);
      return {
        ...state,
        courses: updatedCourses,
        currentCourse: null,
        error: ''
      };

    case fromCourses.CourseActionTypes.TOTAL_FAIL:
        console.log('TotalFail');
      return {
        ...state,
        totalCourses: 0,
        error: action.payload
      };

    case fromCourses.CourseActionTypes.TOTAL_SUCCESS:
      console.log('TotalSuccess');
      let byPath = _.chain(action.payload)
        .groupBy('path')
        .map((values, key) => {
          return {
            'name': key,
            'value': _.reduce(values, function (value, number) {
              return value + 1
            }, 0)
          }
        })
        .value();
      byPath = _.orderBy(byPath, 'value', 'desc');
      console.log('reducer path: ', byPath);

      let bySource = _.chain(action.payload)
        .groupBy('source')
        .map((values, key) => {
          return {
            'name': key,
            'value': _.reduce(values, function (value, number) {
              return value + 1
            }, 0)
          }
        })
        .value();
      bySource = _.orderBy(bySource, 'value', 'desc');
      console.log('reducer source: ', bySource);

      return {
        ...state,
        totalCourses: action.payload.length,
        coursesByPath: byPath,
        coursesBySource: bySource,
        error: ''
      };
  }

  return state;
}

export const getCourses = (state: State) => state.courses;
export const getCurrentCourse = (state: State) => state.currentCourse;
export const getTotalCourses = (state: State) => state.totalCourses;
export const getError = (state: State) => state.error;

import { createFeature, createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';

import { courseActions } from './course.actions';
import { Course, CourseData } from '@models/course';

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

export const reducer = createReducer(
  initialState,
  on(courseActions.deleteCourseFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(courseActions.deleteCourseSuccess, (state) => ({
    ...state,
    error: '',
  })),
  on(courseActions.getCourseFailure, (state, { error }) => ({
    ...state,
    currentCourse: null,
    error: error,
  })),
  on(courseActions.getCourseSuccess, (state, { course }) => ({
    ...state,
    currentCourse: course,
    error: '',
  })),
  on(courseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    courses: [],
    error: error,
  })),
  on(courseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses: courses,
    error: '',
  })),
  on(courseActions.saveCourseFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(courseActions.saveCourseSuccess, (state, { course }) => ({
    ...state,
    courses: state.courses.map((item) => (course.id === item.id ? course : item)),
    error: '',
  })),
  on(courseActions.getTotalCoursesFailure, (state, { error }) => ({
    ...state,
    totalCourses: 0,
    error: error,
  })),
  on(courseActions.getTotalCoursesSuccess, (state, { courses }) => ({
    ...state,
    totalCourses: courses.length,
    coursesByPath: getByPathValue(courses),
    coursesBySource: getBySourceValue(courses),
    error: '',
  }))
);

function getByPathValue(courses: Course[]): CourseData[] {
  let byPath = _.chain(courses)
    .groupBy('path')
    .map((values, key) => {
      return {
        name: key,
        value: _.reduce(
          values,
          function (value, number) {
            return value + 1;
          },
          0
        ),
      };
    })
    .value();
  byPath = _.orderBy(byPath, 'value', 'desc');
  return byPath;
}

function getBySourceValue(course: Course[]): CourseData[] {
  let bySource = _.chain(course)
    .groupBy('source')
    .map((values, key) => {
      return {
        name: key,
        value: _.reduce(
          values,
          function (value, number) {
            return value + 1;
          },
          0
        ),
      };
    })
    .value();
  bySource = _.orderBy(bySource, 'value', 'desc');
  return bySource;
}

export const coursesFeature = createFeature({
  name: 'courseFeature',
  reducer,
});

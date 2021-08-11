import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCourses from './course.reducer';

// course selectors
const getCourseFeatureState = createFeatureSelector<fromCourses.State>('courses');

export const getCourses = createSelector(getCourseFeatureState, (state) => state.courses);

export const getCourse = createSelector(getCourseFeatureState, (state) => state.currentCourse);

export const saveCourse = createSelector(getCourseFeatureState, (state) => state.currentCourse);

export const getTotalCourses = createSelector(getCourseFeatureState, (state) => state.totalCourses);

export const getCoursesByPath = createSelector(getCourseFeatureState, (state) => state.coursesByPath);

export const getCoursesBySource = createSelector(getCourseFeatureState, (state) => state.coursesBySource);

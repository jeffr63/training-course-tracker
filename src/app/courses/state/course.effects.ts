import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, concatMap } from 'rxjs/operators';
import * as _ from 'lodash';

import {
  CourseActionTypes,
  Delete, DeleteFail, DeleteSuccess,
  GetCourse, GetCourseFail, GetCourseSuccess,
  GetPaths, GetPathsFail, GetPathsSuccess,
  GetSources, GetSourcesFail, GetSourcesSuccess,
  GetTotal, GetTotalFail, GetTotalSuccess,
  Load, LoadFail, LoadSuccess,
  Save, SaveFail, SaveSuccess,
} from './course.actions';
import { Course } from '../course';
import { CoursesService } from '../courses.service';

@Injectable()
export class CourseEffects {

  constructor(
    private actions: Actions,
    private courseService: CoursesService,
  ) { }

  @Effect()
  deleteCourse$ = this.actions.pipe(
    ofType<Delete>(CourseActionTypes.DELETE),
    map((action: Delete) => action.payload),
    concatMap(({ id, current, pageSize }) => this.courseService.deleteCourse(id).pipe(
      concatMap(_res => [
        new Load({ current, pageSize }),
        new GetTotal(),
        new DeleteSuccess()
      ]),
      catchError(err => of(new DeleteFail(err)))
    ))
  );

  @Effect()
  getCourse$ = this.actions.pipe(
    ofType<GetCourse>(CourseActionTypes.COURSE),
    map((action: GetCourse) => action.payload),
    concatMap((courseId) => this.courseService.getCourse(courseId).pipe(
      map((course: Course) => (new GetCourseSuccess(course))),
      catchError(err => of(new GetCourseFail(err)))
    ))
  );

  @Effect()
  loadCourse$ = this.actions.pipe(
    ofType<Load>(CourseActionTypes.LOAD),
    map((action: Load) => action.payload),
    concatMap((payload) => this.courseService.getCoursesPaged(payload.current, payload.pageSize).pipe(
      map((courses: Course[]) => (new LoadSuccess(courses))),
      catchError(err => of(new LoadFail(err)))
    ))
  );

  @Effect()
  lookupCoursePaths$ = this.actions.pipe(
    ofType<GetPaths>(CourseActionTypes.PATHS),
    switchMap(() => this.courseService.getPaths().pipe(
      map((paths: any[]) => (new GetPathsSuccess(_.map(paths, 'name')))),
      catchError(err => of(new GetPathsFail(err)))
    ))
  );

  @Effect()
  lookupCourseSource$ = this.actions.pipe(
    ofType<GetSources>(CourseActionTypes.SOURCES),
    switchMap(() => this.courseService.getSources().pipe(
      map((sources: any[]) => (new GetSourcesSuccess(_.map(sources, 'name')))),
      catchError(err => of(new GetSourcesFail(err)))
    ))
  );

  @Effect()
  saveCourse$ = this.actions.pipe(
    ofType<Save>(CourseActionTypes.SAVE),
    map((action: Save) => action.payload),
    concatMap((course: Course) => this.courseService.saveCourse(course).pipe(
      concatMap(_res => [
        new GetTotal(),
        new SaveSuccess(course)
      ]),
      catchError(err => of(new SaveFail(err)))
    ))
  );

  @Effect()
  totalCourses$ = this.actions.pipe(
    ofType<GetTotal>(CourseActionTypes.TOTAL),
    concatMap(() => this.courseService.getCourses().pipe(
      map((courses: Course[]) => (new GetTotalSuccess(courses))),
      catchError(err => of(new GetTotalFail(err)))
    ))
  );
}

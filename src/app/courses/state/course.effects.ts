import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, mergeMap, concatMap } from 'rxjs/operators';
import * as _ from 'lodash';

import * as courseActions from './course.actions';
import { Course } from '../course';
import { CoursesService } from '../courses.service';

@Injectable()
export class CourseEffects {

  constructor(
    private actions: Actions,
    private courseService: CoursesService,
  ) { }

  @Effect()
  loadCourse$ = this.actions.pipe(
    ofType(courseActions.CourseActionTypes.LOAD),
    map((action: courseActions.Load) => action.payload),
    concatMap((payload) => this.courseService.getCoursesPaged(payload.current, payload.pageSize).pipe(
      map((courses: Course[]) => (new courseActions.LoadSuccess(courses))),
      catchError(err => of(new courseActions.LoadFail(err)))
    ))
  );

  @Effect()
  totalCourses$ = this.actions.pipe(
    ofType(courseActions.CourseActionTypes.TOTAL),
    concatMap(() => this.courseService.getCoursesUnsorted().pipe(
      map((courses: Course[]) => (new courseActions.GetTotalSuccess(courses))),
      catchError(err => of(new courseActions.GetTotalFail(err)))
    ))
  );

  @Effect()
  getCourse$ = this.actions.pipe(
    ofType(courseActions.CourseActionTypes.COURSE),
    map((action: courseActions.GetCourse) => action.payload),
    concatMap((courseId) => this.courseService.getCourse(courseId).pipe(
      map((course: Course) => (new courseActions.GetCourseSuccess(course))),
      catchError(err => of(new courseActions.GetCourseFail(err)))
    ))
  );

  @Effect()
  saveCourse$ = this.actions.pipe(
    ofType(courseActions.CourseActionTypes.SAVE),
    map((action: courseActions.Save) => action.payload),
    concatMap((course: Course) => this.courseService.saveCourse(course).pipe(
      concatMap(_res => [
        new courseActions.GetTotal(),
        new courseActions.SaveSuccess(course)
      ]),
      catchError(err => of(new courseActions.SaveFail(err)))
    ))
  );

  @Effect()
  deleteCourse$ = this.actions.pipe(
    ofType(courseActions.CourseActionTypes.DELETE),
    map((action: courseActions.Delete) => action.payload),
    concatMap(({ id, current, pageSize }) => this.courseService.deleteCourse(id).pipe(
      concatMap(_res => [
        new courseActions.Load({ current, pageSize }),
        new courseActions.GetTotal(),
        new courseActions.DeleteSuccess()
      ]),
      catchError(err => of(new courseActions.DeleteFail(err)))
    ))
  );

  @Effect()
  lookupCoursePaths$ = this.actions.pipe(
    ofType(courseActions.CourseActionTypes.PATHS),
    switchMap(() => this.courseService.getPaths().pipe(
      map((paths: any[]) => (new courseActions.GetPathsSuccess(_.map(paths, 'name')))),
      catchError(err => of(new courseActions.GetPathsFail(err)))
    ))
  );

  @Effect()
  lookupCourseSource$ = this.actions.pipe(
    ofType(courseActions.CourseActionTypes.SOURCES),
    switchMap(() => this.courseService.getSources().pipe(
      map((sources: any[]) => (new courseActions.GetSourcesSuccess(_.map(sources, 'name')))),
      catchError(err => of(new courseActions.GetSourcesFail(err)))
    ))
  );
}

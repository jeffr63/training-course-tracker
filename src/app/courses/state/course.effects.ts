import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

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
    ofType(courseActions.CourseActionTypes.LoadCourses),
    map((action: courseActions.LoadCoursesAction) => action.payload),
    switchMap((payload) => this.courseService.getCoursesPaged(payload.current, payload.pageSize).pipe(
      map((courses: Course[]) => (new courseActions.LoadCoursesSuccessAction(courses))),
      catchError(err => of(new courseActions.LoadCoursesFailAction(err)))
    ))
  );

  @Effect()
  totalCourses$ = this.actions.pipe(
    ofType(courseActions.CourseActionTypes.GetTotalCourses),
    mergeMap(() => this.courseService.getCoursesUnsorted().pipe(
      map((courses: Course[]) => (new courseActions.GetTotalCoursesSuccessAction(courses))),
      catchError(err => of(new courseActions.GetTotalCoursesFailAction(err)))
    ))
  );

  @Effect()
  getCourse$ = this.actions.pipe(
    ofType(courseActions.CourseActionTypes.GetCourse),
    switchMap((action: courseActions.GetCourseAction) => this.courseService.getCourse(action.payload).pipe(
      map((course: Course) => (new courseActions.GetCourseSuccessAction(course))),
      catchError(err => of(new courseActions.GetCourseFailAction(err)))
    ))
  );

  @Effect()
  saveCourse$ = this.actions.pipe(
    ofType(courseActions.CourseActionTypes.SaveCourse),
    map((action: courseActions.SaveCourseAction) => action.payload),
    switchMap((payload: Course) => this.courseService.saveCourse(payload).pipe(
      switchMap(_res => [
        new courseActions.GetTotalCoursesAction(),
        new courseActions.SaveCourseSuccessAction(payload)
      ]),
      catchError(err => of(new courseActions.SaveCourseFailAction(err)))
    ))
  );

  @Effect()
  deleteCourse$ = this.actions.pipe(
    ofType(courseActions.CourseActionTypes.DeleteCourse),
    map((action: courseActions.DeleteCourseAction) => action.payload),
    switchMap((payload) => this.courseService.deleteCourse(payload.id).pipe(
      switchMap(_res => [
        new courseActions.LoadCoursesAction({ 'current': payload.current, 'pageSize': payload.pageSize }),
        new courseActions.GetTotalCoursesAction(),
        new courseActions.DeleteCourseSuccessAction()
      ]),
      catchError(err => of(new courseActions.DeleteCourseFailAction(err)))
    ))
  );
}

import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { CoursesService } from '../courses.service';
import * as courseActions from './course.actions';
import { mergeMap, map, switchMap } from 'rxjs/operators';
import { Course } from '../course';

@Injectable()
export class CourseEffects {

  constructor(
    private actions: Actions,
    private courseService: CoursesService,
  ) { }

  @Effect()
  loadCourse$ = this.actions.pipe(
    ofType(courseActions.CourseActionTypes.LoadCourses),
    // tslint:disable-next-line:max-line-length
    mergeMap((action: courseActions.LoadCoursesAction) => this.courseService.getCoursesPaged(action.payload.current, action.payload.pageSize)
      .pipe(
        map((courses: Course[]) => (new courseActions.LoadCoursesSuccessAction(courses)))
      ))
  );

  @Effect()
  totalCourses$ = this.actions.pipe(
    ofType(courseActions.CourseActionTypes.GetTotalCourses),
    mergeMap(() => this.courseService.getCoursesUnsorted().pipe(
      map((courses: Course[]) => (new courseActions.GetTotalCoursesSuccessAction(courses)))
    ))
  );

  @Effect()
  getCourse$ = this.actions.pipe(
    ofType(courseActions.CourseActionTypes.GetCourse),
    mergeMap((action: courseActions.GetCourseAction) => this.courseService.getCourse(action.payload).pipe(
      map((course: Course) => (new courseActions.GetCourseSuccessAction(course)))
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
      ])
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
      ])
    ))
  );
}

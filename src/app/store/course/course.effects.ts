import { Injectable, inject } from '@angular/core';

import { of } from 'rxjs';
import { map, catchError, concatMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { courseActions } from './course.actions';
import { Course } from '@models/course';
import { CoursesService } from '@services/courses.service';

@Injectable()
export class CourseEffects {
  private actions = inject(Actions);
  private courseService = inject(CoursesService);

  deleteCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(courseActions.deleteCourse),
      concatMap(({ id, current, pageSize }) =>
        this.courseService.deleteCourse(id).pipe(
          concatMap((_res) => [
            courseActions.loadCourses({ current, pageSize }),
            courseActions.getTotalCourses(),
            courseActions.deleteCourseSuccess(),
          ]),
          catchError((err) => of(courseActions.deleteCourseFailure({ error: err })))
        )
      )
    )
  );

  getCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(courseActions.getCourse),
      concatMap(({ id }) =>
        this.courseService.getCourse(id).pipe(
          map((course: Course) => courseActions.getCourseSuccess({ course })),
          catchError((err) => of(courseActions.getCourseFailure({ error: err })))
        )
      )
    )
  );

  loadCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(courseActions.loadCourses),
      concatMap(({ current, pageSize }) =>
        this.courseService.getCoursesPaged(current, pageSize).pipe(
          map((courses: Course[]) => courseActions.loadCoursesSuccess({ courses })),
          catchError((err) => of(courseActions.loadCoursesFailure({ error: err })))
        )
      )
    )
  );

  saveCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(courseActions.saveCourse),
      concatMap(({ course }) =>
        this.courseService.saveCourse(course).pipe(
          concatMap((_res) => [courseActions.getTotalCourses(), courseActions.saveCourseSuccess({ course })]),
          catchError((err) => of(courseActions.saveCourseFailure({ error: err })))
        )
      )
    )
  );

  totalCourses$ = createEffect(() =>
    this.actions.pipe(
      ofType(courseActions.getTotalCourses),
      concatMap(() =>
        this.courseService.getCourses().pipe(
          map((courses: Course[]) => courseActions.getTotalCoursesSuccess({ courses })),
          catchError((err) => of(courseActions.getTotalCoursesFailure({ error: err })))
        )
      )
    )
  );
}

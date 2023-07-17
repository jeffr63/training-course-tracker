import { Injectable, inject } from '@angular/core';

import { of } from 'rxjs';
import { map, catchError, concatMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { coursesActions } from './course.actions';
import { Course } from '@models/course';
import { CoursesService } from '@services/courses.service';

@Injectable()
export class CourseEffects {
  private actions = inject(Actions);
  private courseService = inject(CoursesService);

  deleteCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(coursesActions.deleteCourse),
      concatMap(({ id, current, pageSize }) =>
        this.courseService.deleteCourse(id).pipe(
          concatMap((_res) => [
            coursesActions.loadCourses({ current, pageSize }),
            coursesActions.getTotalCourses(),
            coursesActions.deleteCourseSuccess(),
          ]),
          catchError((err) => of(coursesActions.deleteCourseFailure({ error: err })))
        )
      )
    )
  );

  getCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(coursesActions.getCourse),
      concatMap(({ id }) =>
        this.courseService.getCourse(id).pipe(
          map((course: Course) => coursesActions.getCourseSuccess({ course })),
          catchError((err) => of(coursesActions.getCourseFailure({ error: err })))
        )
      )
    )
  );

  loadCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(coursesActions.loadCourses),
      concatMap(({ current, pageSize }) =>
        this.courseService.getCoursesPaged(current, pageSize).pipe(
          map((courses: Course[]) => coursesActions.loadCoursesSuccess({ courses })),
          catchError((err) => of(coursesActions.loadCoursesFailure({ error: err })))
        )
      )
    )
  );

  saveCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(coursesActions.saveCourse),
      concatMap(({ course }) =>
        this.courseService.saveCourse(course).pipe(
          concatMap((_res) => [coursesActions.getTotalCourses(), coursesActions.saveCourseSuccess({ course })]),
          catchError((err) => of(coursesActions.saveCourseFailure({ error: err })))
        )
      )
    )
  );

  totalCourses$ = createEffect(() =>
    this.actions.pipe(
      ofType(coursesActions.getTotalCourses),
      concatMap(() =>
        this.courseService.getCourses().pipe(
          map((courses: Course[]) => coursesActions.getTotalCoursesSuccess({ courses })),
          catchError((err) => of(coursesActions.getTotalCoursesFailure({ error: err })))
        )
      )
    )
  );
}

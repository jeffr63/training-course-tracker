import { describe, it, expect } from 'vitest';

import { of, skip, take, throwError } from 'rxjs';

import { coursesActions } from './course.actions';
import { Course } from '@models/course-interface';
import { courseEffects } from './course.effects';
import { CoursesData } from '@shared/services/course/courses-data';

const course: Course = {
  id: 1,
  title: 'ABC',
  instructor: 'Joe',
  path: 'A',
  source: 'B',
};

const courses: Course[] = [
  {
    id: 1,
    title: 'ABC',
    instructor: 'Joe',
    path: 'A',
    source: 'B',
  },
];

describe(`Course Effects`, () => {
  describe(`deleteCourse$ effect`, () => {
    it(`should return deleteCoursesSuccess, with courses, on success`, async () => {
      const courseServiceMock = {
        deleteCourse: (id) => of(1),
      } as unknown as CoursesData;
      const action$ = of(coursesActions.deleteCourse({ id: 1, current: 1, pageSize: 1 }));
      courseEffects
        .deleteCourse$(action$, courseServiceMock)
        .pipe(take(1))
        .subscribe((action) => {
          expect(action).toEqual(coursesActions.loadCourses({ current: 1, pageSize: 1 }));
        });
      courseEffects
        .deleteCourse$(action$, courseServiceMock)
        .pipe(skip(1), take(1))
        .subscribe((action) => {
          expect(action).toEqual(coursesActions.getTotalCourses());
        });
      courseEffects
        .deleteCourse$(action$, courseServiceMock)
        .pipe(skip(2))
        .subscribe((action) => {
          expect(action).toEqual(coursesActions.deleteCourseSuccess());
        });
    });

    it(`should return deleteCoursesFailure, with error, on failure`, async () => {
      const courseServiceMock = {
        deleteCourse: (id) => throwError(() => 'Failure'),
      } as unknown as CoursesData;
      const action$ = of(coursesActions.deleteCourse({ id: 1, current: 1, pageSize: 1 }));
      courseEffects.deleteCourse$(action$, courseServiceMock).subscribe((action) => {
        expect(action).toEqual(coursesActions.deleteCourseFailure({ error: 'Failure' }));
      });
    });
  });

  describe(`getCourse$ effect`, () => {
    it(`should return getCourseSuccess, with course, on success`, async () => {
      const courseServiceMock = {
        getCourse: () => of(course),
      } as unknown as CoursesData;
      const action$ = of(coursesActions.getCourse({ id: 1 }));
      courseEffects.getCourse$(action$, courseServiceMock).subscribe((action) => {
        expect(action).toEqual(coursesActions.getCourseSuccess({ course }));
      });
    });

    it(`should return getCoursesFailure, with error, on failure`, async () => {
      const courseServiceMock = {
        getCourse: () => throwError(() => 'Failure'),
      } as unknown as CoursesData;
      const action$ = of(coursesActions.getCourse({ id: 1 }));
      courseEffects.getCourse$(action$, courseServiceMock).subscribe((action) => {
        expect(action).toEqual(coursesActions.getCourseFailure({ error: 'Failure' }));
      });
    });
  });

  describe(`loadCourses$ effect`, () => {
    it(`should return loadCoursesSuccess, with courses, on success`, async () => {
      const courseServiceMock = {
        getCoursesPaged: () => of(courses),
      } as unknown as CoursesData;
      const action$ = of(coursesActions.loadCourses({ current: 1, pageSize: 1 }));
      courseEffects.loadCourses$(action$, courseServiceMock).subscribe((action) => {
        expect(action).toEqual(coursesActions.loadCoursesSuccess({ courses }));
      });
    });

    it(`should return loadCoursesFailure, with error, on failure`, async () => {
      const courseServiceMock = {
        getCoursesPaged: () => throwError(() => 'Failure'),
      } as unknown as CoursesData;
      const action$ = of(coursesActions.loadCourses({ current: 1, pageSize: 1 }));
      courseEffects.loadCourses$(action$, courseServiceMock).subscribe((action) => {
        expect(action).toEqual(coursesActions.loadCoursesFailure({ error: 'Failure' }));
      });
    });
  });

  describe(`saveCourse$ effect`, () => {
    it(`should return saveCoursesSuccess, with courses, on success`, async () => {
      const courseServiceMock = {
        saveCourse: () => of(course),
      } as unknown as CoursesData;
      const action$ = of(coursesActions.saveCourse({ course }));
      courseEffects
        .saveCourse$(action$, courseServiceMock)
        .pipe(take(1))
        .subscribe((action) => {
          expect(action).toEqual(coursesActions.getTotalCourses());
        });
      courseEffects
        .saveCourse$(action$, courseServiceMock)
        .pipe(skip(1))
        .subscribe((action) => {
          expect(action).toEqual(coursesActions.saveCourseSuccess({ course }));
        });
    });

    it(`should return saveCoursesFailure, with error, on failure`, async () => {
      const courseServiceMock = {
        saveCourse: () => throwError(() => 'Failure'),
      } as unknown as CoursesData;
      const action$ = of(coursesActions.saveCourse({ course }));
      courseEffects.saveCourse$(action$, courseServiceMock).subscribe((action) => {
        expect(action).toEqual(coursesActions.saveCourseFailure({ error: 'Failure' }));
      });
    });
  });

  describe(`totalsCourses$ effect`, () => {
    it(`should return totalCoursesSuccess, with courses, on success`, async () => {
      const courseServiceMock = {
        getCourses: () => of(courses),
      } as unknown as CoursesData;
      const action$ = of(coursesActions.getTotalCourses());
      courseEffects.totalCourses$(action$, courseServiceMock).subscribe((action) => {
        expect(action).toEqual(coursesActions.getTotalCoursesSuccess({ courses }));
      });
    });
  });
});

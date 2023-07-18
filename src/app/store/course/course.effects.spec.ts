import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { coursesActions } from './course.actions';
import { Course } from '@models/course';
import { CourseEffects } from './course.effects';
import { CoursesService } from '@services/courses.service';
import { State, initialState } from './course.state';

const coursesService = jasmine.createSpyObj('coursesService', [
  'deleteCourse',
  'getCourse',
  'getCourses',
  'getCoursesPaged',
  'saveCourse',
]);

describe(`Course Effects`, () => {
  let actions$: Observable<any>;
  let effects = CourseEffects;
  let store: MockStore<State>;
  let testScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
        { provide: CoursesService, useValue: coursesService },
      ],
    });

   // effects = TestBed.inject(CourseEffects);
    store = TestBed.inject(MockStore);
    store.setState(initialState);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe(`deleteCourse$ effect`, () => {
    it(`should return DeleteSuccess, with course, on success`, () => {
      const action = coursesActions.deleteCourse({
        id: 1,
        current: 1,
        pageSize: 3,
      });
      const load = coursesActions.loadCourses({ current: 1, pageSize: 3 });
      const recount = coursesActions.getTotalCourses();
      const completion = coursesActions.deleteCourseSuccess();

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: 1 });
        coursesService.deleteCourse.and.returnValue(response);

        expectObservable(effects.deleteCourse$).toBe('--(cde)', { c: load, d: recount, e: completion });
      });
    });

    it(`should return DeleteFailure, with error, on failure`, () => {
      const error = 'Error';
      const action = coursesActions.deleteCourse({
        id: 1,
        current: 1,
        pageSize: 3,
      });
      const completion = coursesActions.deleteCourseFailure({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        coursesService.deleteCourse.and.returnValue(response);

        expectObservable(effects.deleteCourse$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`getCourse$ effect`, () => {
    it(`should return GetCourseSuccess, with course, on success`, () => {
      const course: Course = {
        id: 1,
        title: 'ABC',
        instructor: 'Joe',
        path: 'A',
        source: 'B',
      };

      const action = coursesActions.getCourse({ id: 1 });
      const completion = coursesActions.getCourseSuccess({ course });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: course });
        coursesService.getCourse.and.returnValue(response);

        expectObservable(effects.getCourse$).toBe('--c', { c: completion });
      });
    });

    it(`should return GetCourseFailure, with error, on failure`, () => {
      const error = 'Error';
      const action = coursesActions.getCourse({ id: 1 });
      const completion = coursesActions.getCourseFailure({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        coursesService.getCourse.and.returnValue(response);

        expectObservable(effects.getCourse$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`loadCourse$ effect`, () => {
    it(`should return LoadSuccess, with courses, on success`, () => {
      const courses: Course[] = [
        {
          id: 1,
          title: 'ABC',
          instructor: 'Joe',
          path: 'A',
          source: 'B',
        } as Course,
        {
          id: 1,
          title: 'DEF',
          instructor: 'Jack',
          path: 'A',
          source: 'B',
        } as Course,
      ];

      const action = coursesActions.loadCourses({ current: 1, pageSize: 3 });
      const completion = coursesActions.loadCoursesSuccess({ courses });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: courses });
        coursesService.getCoursesPaged.and.returnValue(response);

        expectObservable(effects.loadCourse$).toBe('--c', { c: completion });
      });
    });

    it(`should return LoadFailure, with error, on failure`, () => {
      const error = 'Error';
      const action = coursesActions.loadCourses({ current: 1, pageSize: 3 });
      const completion = coursesActions.loadCoursesFailure({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        coursesService.getCoursesPaged.and.returnValue(response);

        expectObservable(effects.loadCourse$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`saveCourse$ effect`, () => {
    it(`should return SaveSuccess, with course, on success`, () => {
      const course: Course = {
        id: 1,
        title: 'ABC',
        instructor: 'Joe',
        path: 'A',
        source: 'B',
      };

      const action = coursesActions.saveCourse({ course });
      const recount = coursesActions.getTotalCourses();
      const completion = coursesActions.saveCourseSuccess({ course });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: course });
        coursesService.saveCourse.and.returnValue(response);

        expectObservable(effects.saveCourse$).toBe('--(cd)', { c: recount, d: completion });
      });
    });

    it(`should return SaveFailure, with error, on failure`, () => {
      const course: Course = {
        id: 1,
        title: 'ABC',
        instructor: 'Joe',
        path: 'A',
        source: 'B',
      };
      const error = 'Error';
      const action = coursesActions.saveCourse({ course });
      const completion = coursesActions.saveCourseFailure({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        coursesService.saveCourse.and.returnValue(response);

        expectObservable(effects.saveCourse$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`totalCourses$ effect`, () => {
    it(`should return GetTotalSuccess, with courses, on success`, () => {
      const courses: Course[] = [
        {
          id: 1,
          title: 'ABC',
          instructor: 'Joe',
          path: 'A',
          source: 'B',
        } as Course,
        {
          id: 1,
          title: 'DEF',
          instructor: 'Jack',
          path: 'A',
          source: 'B',
        } as Course,
      ];

      const action = coursesActions.getTotalCourses();
      const completion = coursesActions.getTotalCoursesSuccess({ courses });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: courses });
        coursesService.getCourses.and.returnValue(response);

        expectObservable(effects.totalCourses$).toBe('--c', { c: completion });
      });
    });

    it(`should return GetTotalFailure, with error, on failure`, () => {
      const error = 'Error';
      const action = coursesActions.getTotalCourses();
      const completion = coursesActions.getTotalCoursesFailure({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        coursesService.getCourses.and.returnValue(response);

        expectObservable(effects.totalCourses$).toBe('--b', { b: completion });
      });
    });
  });
});

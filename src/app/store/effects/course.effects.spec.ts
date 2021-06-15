import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as courseActions from '../actions/course.actions';
import { Course } from '../../shared/course';
import { CourseEffects } from './course.effects';
import { CoursesService } from '../../courses/courses.service';

class MockCoursesService {
  deleteCourse = jasmine.createSpy('deleteCourse');
  getCourse = jasmine.createSpy('getCourse');
  getCourses = jasmine.createSpy('getCoursesUnsorted');
  getCoursesPaged = jasmine.createSpy('getCoursesPaged');
  saveCourse = jasmine.createSpy('saveCourse');
}

describe(`Course Effects`, () => {
  let actions$: Observable<any>
  let effects: CourseEffects;
  let coursesService; //: MockCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseEffects,
        provideMockActions(() => actions$),
        { provide: CoursesService, useClass: MockCoursesService },
      ]
    });

    effects = TestBed.inject(CourseEffects);
    coursesService = TestBed.inject(CoursesService);
  });

  describe(`deleteCourse$ effect`, () => {
    it(`should return DeleteSuccess, with course, on success`, () => {
      const action = courseActions.deleteCourse({ id: 1, current: 1, pageSize: 3 });
      const load = courseActions.loadCourses({ current: 1, pageSize: 3 });
      const recount = courseActions.getTotalCourses();
      const completion = courseActions.deleteCourseSuccess();

      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: 1 });
      const expected = cold('--(cde)', { c: load, d: recount, e: completion });
      coursesService.deleteCourse.and.returnValue(response);

      expect(effects.deleteCourse$).toBeObservable(expected);
    });

    it(`should return DeleteFail, with error, on failure`, () => {
      const error = 'Error';
      const action = courseActions.deleteCourse({ id: 1, current: 1, pageSize: 3 });
      const completion = courseActions.deleteCourseFail({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      coursesService.deleteCourse.and.returnValue(response);

      expect(effects.deleteCourse$).toBeObservable(expected);
    });
  });

  describe(`getCourse$ effect`, () => {
    it(`should return GetCourseSuccess, with course, on success`, () => {
      const course: Course = { id: 1, title: 'ABC', instructor: 'Joe', path: 'A', source: 'B' };

      const action = courseActions.getCourse({ id: 1 });
      const completion = courseActions.getCourseSuccess({ course });

      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: course });
      const expected = cold('--c', { c: completion });
      coursesService.getCourse.and.returnValue(response);

      expect(effects.getCourse$).toBeObservable(expected);
    });

    it(`should return GetCourseFail, with error, on failure`, () => {
      const error = 'Error';
      const action = courseActions.getCourse({ id: 1 });
      const completion = courseActions.getCourseFail({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      coursesService.getCourse.and.returnValue(response);

      expect(effects.getCourse$).toBeObservable(expected);
    });
  });

  describe(`loadCourse$ effect`, () => {
    it(`should return LoadSuccess, with courses, on success`, () => {
      const courses: Course[] = [
        { id: 1, title: 'ABC', instructor: 'Joe', path: 'A', source: 'B' } as Course,
        { id: 1, title: 'DEF', instructor: 'Jack', path: 'A', source: 'B' } as Course
      ];

      const action = courseActions.loadCourses({ current: 1, pageSize: 3 });
      const completion = courseActions.loadCoursesSuccess({ courses });

      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: courses });
      const expected = cold('--c', { c: completion });
      coursesService.getCoursesPaged.and.returnValue(response);

      expect(effects.loadCourse$).toBeObservable(expected);
    });

    it(`should return LoadFail, with error, on failure`, () => {
      const error = 'Error';
      const action = courseActions.loadCourses({ current: 1, pageSize: 3 });
      const completion = courseActions.loadCoursesFail({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      coursesService.getCoursesPaged.and.returnValue(response);

      expect(effects.loadCourse$).toBeObservable(expected);
    });
  });

  describe(`saveCourse$ effect`, () => {
    it(`should return SaveSuccess, with course, on success`, () => {
      const course: Course = { id: 1, title: 'ABC', instructor: 'Joe', path: 'A', source: 'B' };

      const action = courseActions.saveCourse({ course });
      const recount = courseActions.getTotalCourses();
      const completion = courseActions.saveCourseSuccess({ course });

      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: course });
      const expected = cold('--(cd)', { c: recount, d: completion });
      coursesService.saveCourse.and.returnValue(response);

      expect(effects.saveCourse$).toBeObservable(expected);
    });

    it(`should return SaveFail, with error, on failure`, () => {
      const course: Course = { id: 1, title: 'ABC', instructor: 'Joe', path: 'A', source: 'B' };
      const error = 'Error';
      const action = courseActions.saveCourse({ course });
      const completion = courseActions.saveCourseFail({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      coursesService.saveCourse.and.returnValue(response);

      expect(effects.saveCourse$).toBeObservable(expected);
    });
  });

  describe(`totalCourses$ effect`, () => {
    it(`should return GetTotalSuccess, with courses, on success`, () => {
      const courses: Course[] = [
        { id: 1, title: 'ABC', instructor: 'Joe', path: 'A', source: 'B' } as Course,
        { id: 1, title: 'DEF', instructor: 'Jack', path: 'A', source: 'B' } as Course
      ];

      const action = courseActions.getTotalCourses();
      const completion = courseActions.getTotalCoursesSuccess({ courses });

      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: courses });
      const expected = cold('--c', { c: completion });
      coursesService.getCourses.and.returnValue(response);

      expect(effects.totalCourses$).toBeObservable(expected);
    });

    it(`should return GetTotalFail, with error, on failure`, () => {
      const error = 'Error';
      const action = courseActions.getTotalCourses();
      const completion = courseActions.getTotalCoursesFail({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      coursesService.getCourses.and.returnValue(response);

      expect(effects.totalCourses$).toBeObservable(expected);
    });
  });

});

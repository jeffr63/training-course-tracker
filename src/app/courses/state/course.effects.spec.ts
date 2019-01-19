import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { empty } from 'rxjs';

import { Course } from '../course';
import { CourseEffects } from './course.effects';
import { CoursesService } from '../courses.service';
import {
  Delete, DeleteFail, DeleteSuccess,
  GetCourse, GetCourseFail, GetCourseSuccess,
  Load, LoadFail, LoadSuccess,
  GetPaths, GetPathsFail, GetPathsSuccess,
  GetSources, GetSourcesFail, GetSourcesSuccess,
  GetTotal, GetTotalFail, GetTotalSuccess,
  Save, SaveFail, SaveSuccess
} from './course.actions';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

class MockCoursesService {
  deleteCourse = jasmine.createSpy('deleteCourse');
  getCourse = jasmine.createSpy('getCourse');
  getCoursesUnsorted = jasmine.createSpy('getCoursesUnsorted');
  getCoursesPaged = jasmine.createSpy('getCoursesPaged');
  saveCourse = jasmine.createSpy('saveCourse');
  getPaths = jasmine.createSpy('getPaths');
  getSources = jasmine.createSpy('getSources');
}

describe(`Course Effects`, () => {
  let actions$: TestActions;
  let effects: CourseEffects;
  let coursesService: MockCoursesService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseEffects,
        provideMockActions(() => actions$),
        { provide: CoursesService, useClass: MockCoursesService },
        { provide: Actions, useFactory: getActions },
      ]
    });

    effects = TestBed.get(CourseEffects);
    coursesService = TestBed.get(CoursesService);
    actions$ = TestBed.get(Actions);
  });

  describe(`deleteCourse$ effect`, () => {
    it(`should return DeleteSuccess, with course, on success`, () => {
      const action = new Delete({ id: 1, current: 1, pageSize: 3 });
      const load = new Load({ current: 1, pageSize: 3 });
      const recount = new GetTotal();
      const completion = new DeleteSuccess();

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: 1 });
      const expected = cold('--(cde)', { c: load, d: recount, e: completion });
      coursesService.deleteCourse.and.returnValue(response);

      expect(effects.deleteCourse$).toBeObservable(expected);
    });

    it(`should return DeleteFail, with error, on failure`, () => {
      const error = 'Error';
      const action = new Delete({ id: 1, current: 1, pageSize: 3 });
      const completion = new DeleteFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      coursesService.deleteCourse.and.returnValue(response);

      expect(effects.deleteCourse$).toBeObservable(expected);
    });
  });

  describe(`getCourse$ effect`, () => {
    it(`should return GetCourseSuccess, with course, on success`, () => {
      const course: Course = { id: 1, title: 'ABC', instructor: 'Joe', path: 'A', source: 'B', yearCompleted: '2019' };

      const action = new GetCourse(1);
      const completion = new GetCourseSuccess(course);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: course });
      const expected = cold('--c', { c: completion });
      coursesService.getCourse.and.returnValue(response);

      expect(effects.getCourse$).toBeObservable(expected);
    });

    it(`should return GetCourseFail, with error, on failure`, () => {
      const error = 'Error';
      const action = new GetCourse(1);
      const completion = new GetCourseFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      coursesService.getCourse.and.returnValue(response);

      expect(effects.getCourse$).toBeObservable(expected);
    });
  });

  describe(`loadCourse$ effect`, () => {
    it(`should return LoadSuccess, with courses, on success`, () => {
      const courses: Course[] = [
        { id: 1, title: 'ABC', instructor: 'Joe', path: 'A', source: 'B', yearCompleted: '2019' } as Course,
        { id: 1, title: 'DEF', instructor: 'Jack', path: 'A', source: 'B', yearCompleted: '2019' } as Course
      ];

      const action = new Load({ current: 1, pageSize: 3 });
      const completion = new LoadSuccess(courses);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: courses });
      const expected = cold('--c', { c: completion });
      coursesService.getCoursesPaged.and.returnValue(response);

      expect(effects.loadCourse$).toBeObservable(expected);
    });

    it(`should return LoadFail, with error, on failure`, () => {
      const error = 'Error';
      const action = new Load({ current: 1, pageSize: 3 });
      const completion = new LoadFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      coursesService.getCoursesPaged.and.returnValue(response);

      expect(effects.loadCourse$).toBeObservable(expected);
    });
  });

  describe(`lookupCoursePaths$ effect`, () => {
    it(`should return GetPathsSuccess, with paths, on success`, () => {
      const impPaths = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];
      const retPaths = ['ABC', 'DEF'];

      const action = new GetPaths();
      const completion = new GetPathsSuccess(retPaths);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: impPaths });
      const expected = cold('--c', { c: completion });
      coursesService.getPaths.and.returnValue(response);

      expect(effects.lookupCoursePaths$).toBeObservable(expected);
    });

    it(`should return GetPathsFail, with error, on failure`, () => {
      const error = 'Error';
      const action = new GetPaths();
      const completion = new GetPathsFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      coursesService.getPaths.and.returnValue(response);

      expect(effects.lookupCoursePaths$).toBeObservable(expected);
    });
  });

  describe(`lookupCourseSource$ effect`, () => {
    it(`should return GetSourcesSuccess, with sources, on success`, () => {
      const impSources = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];
      const retSources = ['ABC', 'DEF'];

      const action = new GetSources();
      const completion = new GetSourcesSuccess(retSources);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: impSources });
      const expected = cold('--c', { c: completion });
      coursesService.getSources.and.returnValue(response);

      expect(effects.lookupCourseSource$).toBeObservable(expected);
    });

    it(`should return GetSourcesFail, with error, on failure`, () => {
      const error = 'Error';
      const action = new GetSources();
      const completion = new GetSourcesFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      coursesService.getSources.and.returnValue(response);

      expect(effects.lookupCourseSource$).toBeObservable(expected);
    });
  });

  describe(`saveCourse$ effect`, () => {
    it(`should return SaveSuccess, with course, on success`, () => {
      const course: Course = { id: 1, title: 'ABC', instructor: 'Joe', path: 'A', source: 'B', yearCompleted: '2019' };

      const action = new Save(course);
      const recount = new GetTotal();
      const completion = new SaveSuccess(course);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: course });
      const expected = cold('--(cd)', { c: recount, d: completion });
      coursesService.saveCourse.and.returnValue(response);

      expect(effects.saveCourse$).toBeObservable(expected);
    });

    it(`should return SaveFail, with error, on failure`, () => {
      const course: Course = { id: 1, title: 'ABC', instructor: 'Joe', path: 'A', source: 'B', yearCompleted: '2019' };
      const error = 'Error';
      const action = new Save(course);
      const completion = new SaveFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      coursesService.saveCourse.and.returnValue(response);

      expect(effects.saveCourse$).toBeObservable(expected);
    });
  });

  describe(`totalCourses$ effect`, () => {
    it(`should return GetTotalSuccess, with courses, on success`, () => {
      const courses: Course[] = [
        { id: 1, title: 'ABC', instructor: 'Joe', path: 'A', source: 'B', yearCompleted: '2019' } as Course,
        { id: 1, title: 'DEF', instructor: 'Jack', path: 'A', source: 'B', yearCompleted: '2019' } as Course
      ];

      const action = new GetTotal();
      const completion = new GetTotalSuccess(courses);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: courses });
      const expected = cold('--c', { c: completion });
      coursesService.getCoursesUnsorted.and.returnValue(response);

      expect(effects.totalCourses$).toBeObservable(expected);
    });

    it(`should return GetTotalFail, with error, on failure`, () => {
      const error = 'Error';
      const action = new GetTotal();
      const completion = new GetTotalFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      coursesService.getCoursesUnsorted.and.returnValue(response);

      expect(effects.totalCourses$).toBeObservable(expected);
    });
  });

});

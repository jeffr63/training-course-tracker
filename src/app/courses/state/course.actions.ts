import { Action } from '@ngrx/store';

import { Course } from '../course';

export enum CourseActionTypes {
  GetTotalCourses = '[Courses] Get Total Courses',
  GetTotalCoursesSuccess = '[Courses] Get Total Courses Success',
  GetTotalCoursesFail = '[Courses] Get Total Courses Fail',

  GetCourse = '[Courses] Get Course',
  GetCourseSuccess = '[Courses] Get Course Success',
  GetCourseFail = '[Courses] Get Course Fail',

  SaveCourse = '[Courses] Save Course',
  SaveCourseSuccess = '[Courses] Save Course Success',
  SaveCourseFail = '[Courses] Save Course Fail',

  DeleteCourse = '[Courses] Delete Course',
  DeleteCourseSuccess = '[Courses] Delete Course Succes',
  DeleteCourseFail = '[Courses] Delete Course Fail',

  LoadCourses = '[Courses] Load Courses',
  LoadCoursesSuccess = '[Courses] Load Courses Success',
  LoadCoursesFail = '[Courses] Load Courses Fail',
}

// totalCourses actions
export class GetTotalCoursesAction implements Action {
  readonly type = CourseActionTypes.GetTotalCourses;
}

export class GetTotalCoursesSuccessAction implements Action {
  readonly type = CourseActionTypes.GetTotalCoursesSuccess;

  constructor(public payload: Course[]) { }
}

export class GetTotalCoursesFailAction implements Action {
  readonly type = CourseActionTypes.GetTotalCoursesFail;

  constructor(public payload: string) { }
}

// course edit actions
export class GetCourseAction implements Action {
  readonly type = CourseActionTypes.GetCourse;

  constructor(public payload: number) { }
}

export class GetCourseSuccessAction implements Action {
  readonly type = CourseActionTypes.GetCourseSuccess;

  constructor(public payload: Course) { }
}

export class GetCourseFailAction implements Action {
  readonly type = CourseActionTypes.GetCourseFail;

  constructor(public payload: string) { }
}

export class DeleteCourseAction implements Action {
  readonly type = CourseActionTypes.DeleteCourse;

  constructor(public payload: { 'id': number, 'current': number, 'pageSize': number }) { }
}

export class DeleteCourseSuccessAction implements Action {
  readonly type = CourseActionTypes.DeleteCourseSuccess;
}

export class DeleteCourseFailAction implements Action {
  readonly type = CourseActionTypes.DeleteCourseFail;

  constructor(public payload: string) { }
}

export class SaveCourseAction implements Action {
  readonly type = CourseActionTypes.SaveCourse;

  constructor(public payload: Course) { }
}

export class SaveCourseSuccessAction implements Action {
  readonly type = CourseActionTypes.SaveCourseSuccess;

  constructor(public payload: Course) { }
}

export class SaveCourseFailAction implements Action {
  readonly type = CourseActionTypes.SaveCourseFail;

  constructor(public payload: string) { }
}

// course list actions
export class LoadCoursesAction implements Action {
  readonly type = CourseActionTypes.LoadCourses;

  constructor(public payload: { 'current': number, 'pageSize': number }) { }
}

export class LoadCoursesSuccessAction implements Action {
  readonly type = CourseActionTypes.LoadCoursesSuccess;

  constructor(public payload: Course[]) { }
}

export class LoadCoursesFailAction implements Action {
  readonly type = CourseActionTypes.LoadCoursesFail;

  constructor(public payload: string) { }
}

export type CourseActions = GetTotalCoursesAction
  | GetTotalCoursesSuccessAction
  | GetTotalCoursesFailAction
  | GetCourseAction
  | GetCourseSuccessAction
  | GetCourseFailAction
  | DeleteCourseAction
  | DeleteCourseSuccessAction
  | DeleteCourseFailAction
  | SaveCourseAction
  | SaveCourseSuccessAction
  | SaveCourseFailAction
  | LoadCoursesAction
  | LoadCoursesSuccessAction
  | LoadCoursesFailAction;

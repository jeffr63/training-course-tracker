import { Action } from '@ngrx/store';

import { Course, CourseData } from '../../shared/course';

export enum CourseActionTypes {
  COURSE = '[Courses] Get Course',
  COURSE_SUCCESS = '[Courses] Get Course Success',
  COURSE_FAIL = '[Courses] Get Course Fail',

  DELETE = '[Courses] Delete Course',
  DELETE_SUCCESS = '[Courses] Delete Course Succes',
  DELETE_FAIL = '[Courses] Delete Course Fail',

  LOAD = '[Courses] Load Courses',
  LOAD_SUCCESS = '[Courses] Load Courses Success',
  LOAD_FAIL = '[Courses] Load Courses Fail',

  SAVE = '[Courses] Save Course',
  SAVE_SUCCESS = '[Courses] Save Course Success',
  SAVE_FAIL = '[Courses] Save Course Fail',

  TOTAL = '[Courses] Get Total Courses',
  TOTAL_SUCCESS = '[Courses] Get Total Courses Success',
  TOTAL_FAIL = '[Courses] Get Total Courses Fail',
}

export class Delete implements Action {
  readonly type = CourseActionTypes.DELETE;

  constructor(public payload: { 'id': number, 'current': number, 'pageSize': number }) { }
}

export class DeleteFail implements Action {
  readonly type = CourseActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

export class DeleteSuccess implements Action {
  readonly type = CourseActionTypes.DELETE_SUCCESS;
}

export class GetCourse implements Action {
  readonly type = CourseActionTypes.COURSE;

  constructor(public payload: number) { }
}

export class GetCourseFail implements Action {
  readonly type = CourseActionTypes.COURSE_FAIL;

  constructor(public payload: string) { }
}

export class GetCourseSuccess implements Action {
  readonly type = CourseActionTypes.COURSE_SUCCESS;

  constructor(public payload: Course) { }
}

export class GetTotal implements Action {
  readonly type = CourseActionTypes.TOTAL;
}

export class GetTotalFail implements Action {
  readonly type = CourseActionTypes.TOTAL_FAIL;

  constructor(public payload: string) { }
}

export class GetTotalSuccess implements Action {
  readonly type = CourseActionTypes.TOTAL_SUCCESS;

  constructor(public payload: Course[]) { }
}

export class Load implements Action {
  readonly type = CourseActionTypes.LOAD;

  constructor(public payload: { 'current': number, 'pageSize': number }) { }
}

export class LoadFail implements Action {
  readonly type = CourseActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
  readonly type = CourseActionTypes.LOAD_SUCCESS;

  constructor(public payload: Course[]) { }
}

export class Save implements Action {
  readonly type = CourseActionTypes.SAVE;

  constructor(public payload: Course) { }
}

export class SaveFail implements Action {
  readonly type = CourseActionTypes.SAVE_FAIL;

  constructor(public payload: string) { }
}

export class SaveSuccess implements Action {
  readonly type = CourseActionTypes.SAVE_SUCCESS;

  constructor(public payload: Course) { }
}


export type CourseActions = Delete
  | DeleteFail
  | DeleteSuccess
  | GetCourse
  | GetCourseSuccess
  | GetCourseFail
  | GetTotal
  | GetTotalSuccess
  | GetTotalFail
  | Load
  | LoadSuccess
  | LoadFail
  | Save
  | SaveSuccess
  | SaveFail;

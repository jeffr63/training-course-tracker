import { Action } from '@ngrx/store';

import { Course } from '../course';

export enum CourseActionTypes {
  DELETE = '[Courses] Delete Course',
  DELETE_SUCCESS = '[Courses] Delete Course Succes',
  DELETE_FAIL = '[Courses] Delete Course Fail',

  TOTAL = '[Courses] Get Total Courses',
  TOTAL_SUCCESS = '[Courses] Get Total Courses Success',
  TOTAL_FAIL = '[Courses] Get Total Courses Fail',

  COURSE = '[Courses] Get Course',
  COURSE_SUCCESS = '[Courses] Get Course Success',
  COURSE_FAIL = '[Courses] Get Course Fail',

  LOAD = '[Courses] Load Courses',
  LOAD_SUCCESS = '[Courses] Load Courses Success',
  LOAD_FAIL = '[Courses] Load Courses Fail',

  PATHS = '[Courses] Lookup Paths',
  PATHS_SUCCESS = '[Courses] Lookup Paths Success',
  PATHS_FAIL = '[Courses] Lookup Paths Fail',

  SAVE = '[Courses] Save Course',
  SAVE_SUCCESS = '[Courses] Save Course Success',
  SAVE_FAIL = '[Courses] Save Course Fail',

  SOURCES = '[Courses] Lookup Sources',
  SOURCES_SUCCESS = '[Courses] Lookup Sources Success',
  SOURCES_FAIL = '[Courses] Lookup Sources Fail',
}

// totalCourses actions
export class GetTotal implements Action {
  readonly type = CourseActionTypes.TOTAL;
}

export class GetTotalSuccess implements Action {
  readonly type = CourseActionTypes.TOTAL_SUCCESS;

  constructor(public payload: Course[]) { }
}

export class GetTotalFail implements Action {
  readonly type = CourseActionTypes.TOTAL_FAIL;

  constructor(public payload: string) { }
}

// course edit actions
export class GetCourse implements Action {
  readonly type = CourseActionTypes.COURSE;

  constructor(public payload: number) { }
}

export class GetCourseSuccess implements Action {
  readonly type = CourseActionTypes.COURSE_SUCCESS;

  constructor(public payload: Course) { }
}

export class GetCourseFail implements Action {
  readonly type = CourseActionTypes.COURSE_FAIL;

  constructor(public payload: string) { }
}

export class Delete implements Action {
  readonly type = CourseActionTypes.DELETE;

  constructor(public payload: { 'id': number, 'current': number, 'pageSize': number }) { }
}

export class DeleteSuccess implements Action {
  readonly type = CourseActionTypes.DELETE_SUCCESS;
}

export class DeleteFail implements Action {
  readonly type = CourseActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

export class Save implements Action {
  readonly type = CourseActionTypes.SAVE;

  constructor(public payload: Course) { }
}

export class SaveSuccess implements Action {
  readonly type = CourseActionTypes.SAVE_SUCCESS;

  constructor(public payload: Course) { }
}

export class SaveFail implements Action {
  readonly type = CourseActionTypes.SAVE_FAIL;

  constructor(public payload: string) { }
}

// course list actions
export class Load implements Action {
  readonly type = CourseActionTypes.LOAD;

  constructor(public payload: { 'current': number, 'pageSize': number }) { }
}

export class LoadSuccess implements Action {
  readonly type = CourseActionTypes.LOAD_SUCCESS;

  constructor(public payload: Course[]) { }
}

export class LoadFail implements Action {
  readonly type = CourseActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

// course paths lookup actions
export class GetPaths implements Action {
  readonly type = CourseActionTypes.PATHS;
}

export class GetPathsSuccess implements Action {
  readonly type = CourseActionTypes.PATHS_SUCCESS;

  constructor(public payload: any[]) { }
}

export class GetPathsFail implements Action {
  readonly type = CourseActionTypes.PATHS_FAIL;

  constructor(public payload: string) { }
}

// course sources lookup actions
export class GetSources implements Action {
  readonly type = CourseActionTypes.SOURCES;
}

export class GetSourcesSuccess implements Action {
  readonly type = CourseActionTypes.SOURCES_SUCCESS;

  constructor(public payload: any[]) { }
}

export class GetSourcesFail implements Action {
  readonly type = CourseActionTypes.SOURCES_FAIL;

  constructor(public payload: string) { }
}


export type CourseActions = Delete
  | DeleteFail
  | DeleteSuccess
  | GetCourse
  | GetCourseSuccess
  | GetCourseFail
  | GetPaths
  | GetPathsFail
  | GetPathsSuccess
  | GetSources
  | GetSourcesFail
  | GetSourcesSuccess
  | GetTotal
  | GetTotalSuccess
  | GetTotalFail
  | Load
  | LoadSuccess
  | LoadFail
  | Save
  | SaveSuccess
  | SaveFail;

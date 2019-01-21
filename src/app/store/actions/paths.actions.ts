import { Action } from '@ngrx/store';

import { Path } from './../../services/paths';

export enum PathsActionTypes {
  DELETE = '[Paths] Delete Path',
  DELETE_FAIL = '[Paths] Delete Path Fail',
  DELETE_SUCCESS = '[Paths] Delete Path Success',

  GET = '[Paths] Get Path',
  GET_SUCCESS = '[Paths] Get Path Success',
  GET_FAIL = '[Paths] Get Path Fail',

  LOAD = '[Paths] Load Paths',
  LOAD_FAIL = '[Paths] Load Paths Fail',
  LOAD_SUCCESS = '[Paths] Load Paths Success',

  SAVE = '[Paths] Save Path',
  SAVE_FAIL = '[Paths] Save Path Fail',
  SAVE_SUCCESS = '[Paths] Save Path Success',
}

export class Delete implements Action {
  readonly type = PathsActionTypes.DELETE;

  constructor(public payload: number) { }
}

export class DeleteFail implements Action {
  readonly type = PathsActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

export class DeleteSuccess implements Action {
  readonly type = PathsActionTypes.DELETE_SUCCESS;

  constructor(public payload: number) { }
}

export class Get implements Action {
  readonly type = PathsActionTypes.GET;

  constructor(public payload: number) { }
}

export class GetFail implements Action {
  readonly type = PathsActionTypes.GET_FAIL;

  constructor(public payload: string) { }
}

export class GetSuccess implements Action {
  readonly type = PathsActionTypes.GET_SUCCESS;

  constructor(public payload: Path) { }
}

export class Load implements Action {
  readonly type = PathsActionTypes.LOAD;
}

export class LoadFail implements Action {
  readonly type = PathsActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
  readonly type = PathsActionTypes.LOAD_SUCCESS;

  constructor(public payload: Path[]) { }
}

export class Save implements Action {
  readonly type = PathsActionTypes.SAVE;

  constructor(public payload: Path) { }
}

export class SaveFail implements Action {
  readonly type = PathsActionTypes.SAVE_FAIL;

  constructor(public payload: string) { }
}

export class SaveSuccess implements Action {
  readonly type = PathsActionTypes.SAVE_SUCCESS;

  constructor(public payload: Path) { }
}

export type PathsActions =
  Delete | DeleteFail | DeleteSuccess |
  Get | GetFail | GetSuccess |
  Load | LoadFail | LoadSuccess |
  Save | SaveFail | SaveSuccess;

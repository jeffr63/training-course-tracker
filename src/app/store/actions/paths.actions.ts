import { Action } from '@ngrx/store';

export enum PathsActionTypes {
  LOAD = '[Paths] Load Paths',
  LOAD_SUCCESS = '[Paths] Load Paths Success',
  LOAD_FAIL = '[Paths] Load Paths Fail',
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

  constructor(public payload: any[]) { }
}

export type PathsActions = Load | LoadFail | LoadSuccess;

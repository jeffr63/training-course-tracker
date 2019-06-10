import { Source } from '../../shared/sources';
import { Action } from '@ngrx/store';

export enum SourcesActionTypes {
  DELETE = '[Sources] Delete Source',
  DELETE_SUCCESS = '[Sources] Delete Source Success',
  DELETE_FAIL = '[Sources] Delete Source Fail',

  GET = '[Sources] Get Sources',
  GET_SUCCESS = '[Sources] Get Source Success',
  GET_FAIL = '[Sources] Get Source Fail',

  LOAD = '[Sources] Load Sources',
  LOAD_SUCCESS = '[Sources] Load Sources Success',
  LOAD_FAIL = '[Sources] Load Sources Fail',

  SAVE = '[Sources] Save Source',
  SAVE_SUCCESS = '[Sources] Save Source Success',
  SAVE_FAIL = '[Sources] Save Source Fail',
}

export class Delete implements Action {
  readonly type = SourcesActionTypes.DELETE;

  constructor(public payload: number) { }
}

export class DeleteFail implements Action {
  readonly type = SourcesActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

export class DeleteSuccess implements Action {
  readonly type = SourcesActionTypes.DELETE_SUCCESS;

  constructor(public payload: number) { }
}

export class Get implements Action {
  readonly type = SourcesActionTypes.GET;

  constructor(public payload: number) { }
}

export class GetFail implements Action {
  readonly type = SourcesActionTypes.GET_FAIL;

  constructor(public payload: string) { }
}

export class GetSuccess implements Action {
  readonly type = SourcesActionTypes.GET_SUCCESS;

  constructor(public payload: Source) { }
}

export class Load implements Action {
  readonly type = SourcesActionTypes.LOAD;
}

export class LoadFail implements Action {
  readonly type = SourcesActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
  readonly type = SourcesActionTypes.LOAD_SUCCESS;

  constructor(public payload: any[]) { }
}

export class Save implements Action {
  readonly type = SourcesActionTypes.SAVE;

  constructor(public payload: Source) { }
}

export class SaveFail implements Action {
  readonly type = SourcesActionTypes.SAVE_FAIL;

  constructor(public payload: string) { }
}

export class SaveSuccess implements Action {
  readonly type = SourcesActionTypes.SAVE_SUCCESS;

  constructor(public payload: Source) { }
}

export type SourcesActions =
  Delete | DeleteFail | DeleteSuccess |
  Get | GetFail | GetSuccess |
  Load | LoadFail | LoadSuccess |
  Save | SaveFail | SaveSuccess;

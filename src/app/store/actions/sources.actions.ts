import { Action } from '@ngrx/store';

export enum SourcesActionTypes {
  LOAD = '[Sources] Load Sources',
  LOAD_SUCCESS = '[Sources] Load Sources Success',
  LOAD_FAIL = '[Sources] Load Sources Fail',
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

export type SourcesActions = Load | LoadFail | LoadSuccess;

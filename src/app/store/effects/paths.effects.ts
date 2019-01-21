import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';

import { Path } from './../../services/paths';

import {
  PathsActionTypes,
  Delete, DeleteFail, DeleteSuccess,
  Get, GetFail, GetSuccess,
  Load, LoadFail, LoadSuccess,
  Save, SaveFail, SaveSuccess,
} from '../actions/paths.actions';
import { PathsService } from '../../services/paths.service';

@Injectable()
export class PathsEffects {

  @Effect()
  deletePath$: Observable<Action> = this.actions$.pipe(
    ofType<Delete>(PathsActionTypes.DELETE),
    map((action: Delete) => action.payload),
    switchMap((id) => this.pathsService.delete(id).pipe(
      map(() => (new DeleteSuccess(id))),
      catchError(err => of(new DeleteFail(err)))
    ))
  );

  @Effect()
  getPath$: Observable<Action> = this.actions$.pipe(
    ofType<Get>(PathsActionTypes.GET),
    map((action: Get) => action.payload),
    concatMap((id) => this.pathsService.get(id).pipe(
      map((path: Path) => (new GetSuccess(path))),
      catchError(err => of(new GetFail(err)))
    ))
  );

  @Effect()
  loadPaths$: Observable<Action> = this.actions$.pipe(
    ofType<Load>(PathsActionTypes.LOAD),
    switchMap(() => this.pathsService.load().pipe(
      map((paths: any[]) => (new LoadSuccess(paths))),
      catchError(err => of(new LoadFail(err)))
    ))
  );

  @Effect()
  savePath$: Observable<Action> = this.actions$.pipe(
    ofType<Save>(PathsActionTypes.SAVE),
    map((action: Save) => action.payload),
    concatMap((path: Path) => this.pathsService.save(path).pipe(
      concatMap(_res => [
        new Load(),
        new SaveSuccess(path)
      ]),
      catchError(err => of(new SaveFail(err)))
    ))
  );

  constructor(
    private actions$: Actions,
    private pathsService: PathsService
  ) { }
}

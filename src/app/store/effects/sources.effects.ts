import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';

import { Source } from '../../shared/sources';

import {
  SourcesActionTypes,
  Get, GetFail, GetSuccess,
  Delete, DeleteFail, DeleteSuccess,
  Load, LoadFail, LoadSuccess,
  Save, SaveFail, SaveSuccess
} from '../actions/sources.actions';
import { SourcesService } from '../../services/sources.service';

@Injectable()
export class SourcesEffects {

  @Effect()
  deleteSource$: Observable<Action> = this.actions$.pipe(
    ofType<Delete>(SourcesActionTypes.DELETE),
    map((action: Delete) => action.payload),
    switchMap((id) => this.sourcesService.delete(id).pipe(
      map((source: Source) => (new DeleteSuccess(id))),
      catchError(err => of(new DeleteFail(err)))
    ))
  );

  @Effect()
  getSource$: Observable<Action> = this.actions$.pipe(
    ofType<Get>(SourcesActionTypes.GET),
    map((action: Get) => action.payload),
    concatMap((id) => this.sourcesService.get(id).pipe(
      map((source: Source) => (new GetSuccess(source))),
      catchError(err => of(new GetFail(err)))
    ))
  );


  @Effect()
  loadSources$: Observable<Action> = this.actions$.pipe(
    ofType<Load>(SourcesActionTypes.LOAD),
    switchMap(() => this.sourcesService.load().pipe(
      map((sources: any[]) => (new LoadSuccess(sources))),
      catchError(err => of(new LoadFail(err)))
    ))
  );

  @Effect()
  saveSource$: Observable<Action> = this.actions$.pipe(
    ofType<Save>(SourcesActionTypes.SAVE),
    map((action: Save) => action.payload),
    concatMap((source: Source) => this.sourcesService.save(source).pipe(
      concatMap(_res => [
        new Load(),
        new SaveSuccess(source)
      ]),
      catchError(err => of(new SaveFail(err)))
    ))
  );

  constructor(
    private actions$: Actions,
    private sourcesService: SourcesService
  ) { }
}

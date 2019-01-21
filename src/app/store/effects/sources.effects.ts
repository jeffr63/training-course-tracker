import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';

import { SourcesActionTypes, Load, LoadFail, LoadSuccess } from '../actions/sources.actions';
import { SourcesService } from '../../services/sources.service';

@Injectable()
export class SourcesEffects {

  @Effect()
  loadSources$: Observable<Action> = this.actions$.pipe(
    ofType<Load>(SourcesActionTypes.LOAD),
    switchMap(() => this.sourcesService.load().pipe(
      map((sources: any[]) => (new LoadSuccess(sources))),
      catchError(err => of(new LoadFail(err)))
    ))
  );

  constructor(
    private actions$: Actions,
    private sourcesService: SourcesService
  ) { }
}

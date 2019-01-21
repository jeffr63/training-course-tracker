import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';

import { PathsActionTypes, Load, LoadFail, LoadSuccess } from '../actions/paths.actions';
import { PathsService } from '../../services/paths.service';

@Injectable()
export class PathsEffects {

  @Effect()
  loadPaths$: Observable<Action> = this.actions$.pipe(
    ofType<Load>(PathsActionTypes.LOAD),
    switchMap(() => this.pathsService.load().pipe(
      map((paths: any[]) => (new LoadSuccess(paths))),
      catchError(err => of(new LoadFail(err)))
    ))
  );

  constructor(
    private actions$: Actions,
    private pathsService: PathsService
  ) { }
}

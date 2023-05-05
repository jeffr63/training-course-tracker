import { Injectable, inject } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';

import * as sourceActions from './sources.actions';
import { Source } from '@models/sources';
import { SourcesService } from '@services/sources.service';

@Injectable()
export class SourcesEffects {
  actions = inject(Actions);
  sourcesService = inject(SourcesService);

  deleteSource$ = createEffect(() =>
    this.actions.pipe(
      ofType(sourceActions.deleteSource),
      switchMap(({ id }) =>
        this.sourcesService.delete(id).pipe(
          map(() => sourceActions.deleteSourceSuccess({ id })),
          catchError((err) => of(sourceActions.deleteSourceFail({ error: err })))
        )
      )
    )
  );

  getSource$ = createEffect(() =>
    this.actions.pipe(
      ofType(sourceActions.getSource),
      concatMap(({ id }) =>
        this.sourcesService.get(id).pipe(
          map((source: Source) => sourceActions.getSourceSuccess({ source })),
          catchError((err) => of(sourceActions.getSourceFail({ error: err })))
        )
      )
    )
  );

  loadSources$ = createEffect(() =>
    this.actions.pipe(
      ofType(sourceActions.loadSources),
      switchMap(() =>
        this.sourcesService.load().pipe(
          map((sources: Source[]) => sourceActions.loadSourcesSuccess({ sources })),
          catchError((err) => of(sourceActions.loadSourcesFail({ error: err })))
        )
      )
    )
  );

  saveSource$ = createEffect(() =>
    this.actions.pipe(
      ofType(sourceActions.saveSource),
      concatMap(({ source }) =>
        this.sourcesService.save(source).pipe(
          concatMap((_res) => [sourceActions.loadSources(), sourceActions.saveSourceSuccess({ source })]),
          catchError((err) => of(sourceActions.saveSourceFail({ error: err })))
        )
      )
    )
  );
}

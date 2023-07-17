import { Injectable, inject } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';

import { sourcesActions } from './sources.actions';
import { Source } from '@models/sources';
import { SourcesService } from '@services/sources.service';

@Injectable()
export class SourcesEffects {
  private actions = inject(Actions);
  private sourcesService = inject(SourcesService);

  deleteSource$ = createEffect(() =>
    this.actions.pipe(
      ofType(sourcesActions.deleteSource),
      switchMap(({ id }) =>
        this.sourcesService.delete(id).pipe(
          map(() => sourcesActions.deleteSourceSuccess({ id })),
          catchError((err) => of(sourcesActions.deleteSourceFailure({ error: err })))
        )
      )
    )
  );

  getSource$ = createEffect(() =>
    this.actions.pipe(
      ofType(sourcesActions.getSource),
      concatMap(({ id }) =>
        this.sourcesService.get(id).pipe(
          map((source: Source) => sourcesActions.getSourceSuccess({ source })),
          catchError((err) => of(sourcesActions.getSourceFailure({ error: err })))
        )
      )
    )
  );

  loadSources$ = createEffect(() =>
    this.actions.pipe(
      ofType(sourcesActions.loadSources),
      switchMap(() =>
        this.sourcesService.load().pipe(
          map((sources: Source[]) => sourcesActions.loadSourcesSuccess({ sources })),
          catchError((err) => of(sourcesActions.loadSourcesFailure({ error: err })))
        )
      )
    )
  );

  saveSource$ = createEffect(() =>
    this.actions.pipe(
      ofType(sourcesActions.saveSource),
      concatMap(({ source }) =>
        this.sourcesService.save(source).pipe(
          concatMap((_res) => [sourcesActions.loadSources(), sourcesActions.saveSourceSuccess({ source })]),
          catchError((err) => of(sourcesActions.saveSourceFailure({ error: err })))
        )
      )
    )
  );
}

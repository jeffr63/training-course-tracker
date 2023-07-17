import { Injectable, inject } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';

import { pathsActions } from './paths.actions';
import { Path } from '@models/paths';
import { PathsService } from '@services/paths.service';

@Injectable()
export class PathsEffects {
  private actions = inject(Actions);
  private pathsService = inject(PathsService);

  deletePath$ = createEffect(() =>
    this.actions.pipe(
      ofType(pathsActions.deletePath),
      switchMap(({ id }) =>
        this.pathsService.delete(id).pipe(
          map(() => pathsActions.deletePathSuccess({ id })),
          catchError((err) => of(pathsActions.deletePathFailure({ error: err })))
        )
      )
    )
  );

  getPath$ = createEffect(() =>
    this.actions.pipe(
      ofType(pathsActions.getPath),
      concatMap(({ id }) =>
        this.pathsService.get(id).pipe(
          map((path: Path) => pathsActions.getPathSuccess({ path: path })),
          catchError((err) => of(pathsActions.getPathFailure({ error: err })))
        )
      )
    )
  );

  loadPaths$ = createEffect(() =>
    this.actions.pipe(
      ofType(pathsActions.loadPaths),
      switchMap(() =>
        this.pathsService.load().pipe(
          map((paths: any[]) => pathsActions.loadPathsSuccess({ paths: paths })),
          catchError((err) => of(pathsActions.loadPathsFailure({ error: err })))
        )
      )
    )
  );

  savePath$ = createEffect(() =>
    this.actions.pipe(
      ofType(pathsActions.savePath),
      concatMap(({ path }) =>
        this.pathsService.save(path).pipe(
          concatMap((path: Path) => [pathsActions.loadPaths(), pathsActions.savePathSuccess({ path: path })]),
          catchError((err) => of(pathsActions.savePathFailure({ error: err })))
        )
      )
    )
  );
}

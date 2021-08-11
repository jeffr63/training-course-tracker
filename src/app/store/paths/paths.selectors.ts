import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPaths from './paths.reducer';

// paths selectors
export const selectPathsState = createFeatureSelector<fromPaths.State>('paths');
export const getPaths = createSelector(selectPathsState, fromPaths.getPaths);

export const getCurrentPath = createSelector(selectPathsState, fromPaths.getCurrentPath);

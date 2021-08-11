import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSources from './sources.reducer';

// sources selectors
export const selectSourcesState = createFeatureSelector<fromSources.State>('sources');
export const getSources = createSelector(selectSourcesState, fromSources.getSources);

export const getCurrentSource = createSelector(selectSourcesState, fromSources.getCurrentSource);

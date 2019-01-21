import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import * as fromPaths from './paths.reducer';
import * as fromSources from './sources.reducer';

import { environment } from '../../../environments/environment.prod';

export interface State {
  paths: fromPaths.State;
  sources: fromSources.State;
}

export const reducers: ActionReducerMap<State> = {
  paths: fromPaths.reducer,
  sources: fromSources.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

// paths selectors
export const selectPathsState = createFeatureSelector<fromPaths.State>('paths');
export const getPaths = createSelector(
  selectPathsState,
  fromPaths.getPaths
);

export const getCurrentPath = createSelector(
  selectPathsState,
  fromPaths.getCurrentPath
);

// sources selectors
export const selectSourcesState = createFeatureSelector<fromSources.State>('sources');
export const getSources = createSelector(
  selectSourcesState,
  fromSources.getSources
);

export const getCurrentSource = createSelector(
  selectSourcesState,
  fromSources.getCurrentSource
);

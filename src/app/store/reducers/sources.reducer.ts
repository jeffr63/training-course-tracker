import { Source } from './../../services/sources';

export interface State {
  sources: Source[];
  currentSource: Source;
  error: string;
}
import * as fromSources from '../actions/sources.actions';

export const initialState: State = {
  sources: [],
  currentSource: null,
  error: '',
};

export function reducer(state = initialState, action: fromSources.SourcesActions): State {
  switch (action.type) {
    case fromSources.SourcesActionTypes.DELETE_FAIL:
      return {
        ...state,
        currentSource: null,
        error: action.payload
      };

    case fromSources.SourcesActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        currentSource: null,
        error: '',
        sources: state.sources.filter(source => source.id !== action.payload)
      };

    case fromSources.SourcesActionTypes.GET_FAIL:
      return {
        ...state,
        currentSource: null,
        error: action.payload
      };

    case fromSources.SourcesActionTypes.GET_SUCCESS:
      return {
        ...state,
        currentSource: action.payload,
        error: ''
      };

    case fromSources.SourcesActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        sources: action.payload,
        error: ''
      };

    case fromSources.SourcesActionTypes.LOAD_FAIL:
      return {
        ...state,
        sources: [],
        error: action.payload
      };

    case fromSources.SourcesActionTypes.SAVE_FAIL:
      return {
        ...state,
        error: action.payload
      };

    case fromSources.SourcesActionTypes.SAVE_SUCCESS:
      const updatedSources = state.sources.map(
        item => action.payload.id === item.id ? action.payload : item);
      return {
        ...state,
        sources: updatedSources,
        currentSource: null,
        error: ''
      };

    default:
      return state;
  }
}

export const getSources = (state: State) => state.sources;
export const getError = (state: State) => state.error;
export const getCurrentSource = (state: State) => state.currentSource;

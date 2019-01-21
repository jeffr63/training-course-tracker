export interface State {
  sources: any[];
  error: string;
}
import * as fromSources from '../actions/sources.actions';

export const initialState: State = {
  sources: [],
  error: ''
};

export function reducer(state = initialState, action: fromSources.SourcesActions): State {
  switch (action.type) {
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

    default:
      return state;
  }
}

export const getSources = (state: State) => state.sources;
export const getError = (state: State) => state.error;

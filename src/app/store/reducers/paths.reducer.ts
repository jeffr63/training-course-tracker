import * as fromPaths from '../actions/paths.actions';

export interface State {
  paths: any[];
  error: string;
}

export const initialState: State = {
  paths: [],
  error: ''
};

export function reducer(state = initialState, action: fromPaths.PathsActions): State {
  switch (action.type) {
    case fromPaths.PathsActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        paths: action.payload,
        error: ''
      };

    case fromPaths.PathsActionTypes.LOAD_FAIL:
      return {
        ...state,
        paths: [],
        error: action.payload
      };

    default:
      return state;
  }
}

export const getPaths = (state: State) => state.paths;
export const getError = (state: State) => state.error;

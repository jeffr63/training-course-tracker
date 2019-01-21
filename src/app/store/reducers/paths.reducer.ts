import * as fromPaths from '../actions/paths.actions';
import { Path } from './../../services/paths';

export interface State {
  paths: Path[];
  currentPath: Path;
  error: string;
}

export const initialState: State = {
  paths: [],
  currentPath: null,
  error: ''
};

export function reducer(state = initialState, action: fromPaths.PathsActions): State {
  switch (action.type) {
    case fromPaths.PathsActionTypes.DELETE_FAIL:
      return {
        ...state,
        currentPath: null,
        error: action.payload
      };

    case fromPaths.PathsActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        currentPath: null,
        error: '',
        paths: state.paths.filter(path => path.id !== action.payload)
      };

    case fromPaths.PathsActionTypes.GET_FAIL:
      return {
        ...state,
        currentPath: null,
        error: action.payload
      };

    case fromPaths.PathsActionTypes.GET_SUCCESS:
      return {
        ...state,
        currentPath: action.payload,
        error: ''
      };

    case fromPaths.PathsActionTypes.LOAD_FAIL:
      return {
        ...state,
        paths: [],
        error: action.payload
      };

    case fromPaths.PathsActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        paths: action.payload,
        error: ''
      };

    case fromPaths.PathsActionTypes.SAVE_FAIL:
      return {
        ...state,
        error: action.payload
      };

    case fromPaths.PathsActionTypes.SAVE_SUCCESS:
      const updatedPaths = state.paths.map(
        item => action.payload.id === item.id ? action.payload : item);
      return {
        ...state,
        paths: updatedPaths,
        currentPath: null,
        error: ''
      };

    default:
      return state;
  }
}

export const getPaths = (state: State) => state.paths;
export const getError = (state: State) => state.error;
export const getCurrentPath = (state: State) => state.currentPath;

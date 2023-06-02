import { Source } from '@models/sources';

export interface State {
  sources: Source[];
  currentSource: Source;
  error: string;
}

export const initialState: State = {
  sources: [],
  currentSource: null,
  error: '',
};

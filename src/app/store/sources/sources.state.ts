import { Source } from '@admin/sources/models/sources';

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

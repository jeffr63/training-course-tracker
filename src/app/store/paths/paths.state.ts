import { Path } from '../../admin/paths/models/paths';

export interface State {
  paths: Path[];
  currentPath: Path;
  error: string;
}

export const initialState: State = {
  paths: [],
  currentPath: null,
  error: '',
};

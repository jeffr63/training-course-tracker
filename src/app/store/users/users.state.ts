import { User } from '../../shared/user';

export interface State {
  users: User[];
  currentUser: User;
  error: string;
}

export const initialState: State = {
  users: [],
  currentUser: null,
  error: '',
};

import { User } from '@admin/users/models/user';

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

import * as courseState from '@store/course/course.state';
import * as pathsState from '@store/path/paths.state';
import * as sourcesState from '@store/source/sources.state';
import * as usersState from '@store/user/users.state';

export interface State {
  courses: courseState.State;
  paths: pathsState.State;
  sources: sourcesState.State;
  users: usersState.State;
}

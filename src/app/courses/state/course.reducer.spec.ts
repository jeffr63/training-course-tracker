import * as fromCourses from './course.reducer';
import * as fromActions from './course.actions';
import { Course } from '../course';

describe('Courses Reducer', () => {
  it('should return state when passed an undefined action', () => {
    const { initialState } = fromCourses;
    const action = {} as any;
    const state = fromCourses.reducer(undefined, action);

    expect(state).toBe(initialState);
  });

  describe('COURSE_FAIL action', () => {
    it(`should clear currentCourse and set error`, () => {
      const newState = {
        ...fromCourses.initialState,
        currentCourse: { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B', yearCompleted: '2019' }
      };
      const action = new fromActions.GetCourseFail('Error');
      const state = fromCourses.reducer(newState, action);

      expect(state.currentCourse).toEqual(null);
      expect(state.error).toEqual('Error');
      expect(state.courses).toEqual(newState.courses);
      expect(state.totalCourses).toEqual(newState.totalCourses);
      expect(state.paths).toEqual(newState.paths);
      expect(state.sources).toEqual(newState.sources);
    });
  });

  describe('COURSE_SUCCESS action', () => {
    it(`should clear error`, () => {
      const { initialState } = fromCourses;
      const course = { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B', yearCompleted: '2019' };
      const action = new fromActions.GetCourseSuccess(course);
      const state = fromCourses.reducer(initialState, action);

      expect(state.currentCourse).toEqual(course);
      expect(state.error).toEqual('');
      expect(state.courses).toEqual(initialState.courses);
      expect(state.totalCourses).toEqual(initialState.totalCourses);
      expect(state.paths).toEqual(initialState.paths);
      expect(state.sources).toEqual(initialState.sources);
    });
  });

  describe('DELETE_FAIL action', () => {
    it(`should set error`, () => {
      const { initialState } = fromCourses;
      const action = new fromActions.DeleteFail('Error');
      const state = fromCourses.reducer(initialState, action);

      expect(state.error).toEqual('Error');
      expect(state.courses).toEqual(initialState.courses);
      expect(state.currentCourse).toEqual(initialState.currentCourse);
      expect(state.totalCourses).toEqual(initialState.totalCourses);
      expect(state.paths).toEqual(initialState.paths);
      expect(state.sources).toEqual(initialState.sources);
    });
  });

  describe('DELETE_SUCCESS action', () => {
    it(`should clear error`, () => {
      const { initialState } = fromCourses;
      const action = new fromActions.DeleteSuccess();
      const state = fromCourses.reducer(initialState, action);

      expect(state.error).toEqual('');
      expect(state.courses).toEqual(initialState.courses);
      expect(state.currentCourse).toEqual(initialState.currentCourse);
      expect(state.totalCourses).toEqual(initialState.totalCourses);
      expect(state.paths).toEqual(initialState.paths);
      expect(state.sources).toEqual(initialState.sources);
    });
  });

  describe('LOAD_FAIL action', () => {
    it(`should populate courses from the array and clear error`, () => {
      const { initialState } = fromCourses;
      const action = new fromActions.LoadFail('Error');
      const state = fromCourses.reducer(initialState, action);

      expect(state.courses).toEqual([]);
      expect(state.error).toEqual('Error');
      expect(state.currentCourse).toEqual(initialState.currentCourse);
      expect(state.totalCourses).toEqual(initialState.totalCourses);
      expect(state.paths).toEqual(initialState.paths);
      expect(state.sources).toEqual(initialState.sources);
    });
  });

  describe('LOAD_SUCCESS action', () => {
    it(`should populate courses from the array`, () => {
      const courses: Course[] = [
        { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B', yearCompleted: '2019' },
        { id: 2, title: 'Course 2', instructor: 'Jack', path: 'C', source: 'D', yearCompleted: '2019' }
      ];
      const { initialState } = fromCourses;
      const action = new fromActions.LoadSuccess(courses);
      const state = fromCourses.reducer(initialState, action);

      expect(state.courses).toEqual(courses);
      expect(state.error).toEqual('');
      expect(state.currentCourse).toEqual(initialState.currentCourse);
      expect(state.totalCourses).toEqual(initialState.totalCourses);
      expect(state.paths).toEqual(initialState.paths);
      expect(state.sources).toEqual(initialState.sources);
    });
  });

  describe(`PATHS_FAIL action`, () => {
    it(`should clear paths and set error`, () => {
      const { initialState } = fromCourses;
      const action = new fromActions.GetPathsFail('Error');
      const state = fromCourses.reducer(initialState, action);

      expect(state.paths).toEqual([]);
      expect(state.error).toEqual('Error');
      expect(state.courses).toEqual(initialState.courses);
      expect(state.currentCourse).toEqual(initialState.currentCourse);
      expect(state.totalCourses).toEqual(initialState.totalCourses);
      expect(state.sources).toEqual(initialState.sources);
    });
  });

  describe(`PATHS_SUCCESS action`, () => {
    it(`should populate paths from the array and clear error`, () => {
      const { initialState } = fromCourses;
      const paths: any = ['ABC', 'DEF'];
      const action = new fromActions.GetPathsSuccess(paths);
      const state = fromCourses.reducer(initialState, action);

      expect(state.paths).toEqual(paths);
      expect(state.error).toEqual('');
      expect(state.courses).toEqual(initialState.courses);
      expect(state.currentCourse).toEqual(initialState.currentCourse);
      expect(state.totalCourses).toEqual(initialState.totalCourses);
      expect(state.sources).toEqual(initialState.sources);
    });
  });

  describe('SAVE action', () => {
    it(`should update courses array with saved course information and clear error`, () => {
      const newState = {
        ...fromCourses.initialState,
        courses: [
          { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B', yearCompleted: '2019' },
          { id: 2, title: 'Course 2', instructor: 'Jack', path: 'C', source: 'D', yearCompleted: '2019' }
        ]
      };
      const course = { id: 2, title: 'Update Course 2', instructor: 'John', path: 'A', source: 'D', yearCompleted: '2019' };
      const action = new fromActions.SaveSuccess(course);
      const state = fromCourses.reducer(newState, action);

      expect(state.courses[0]).toEqual(newState.courses[0]);
      expect(state.courses[1]).toEqual(course);
      expect(state.error).toEqual('');
      expect(state.currentCourse).toEqual(newState.currentCourse);
      expect(state.paths).toEqual(newState.paths);
      expect(state.sources).toEqual(newState.paths);
      expect(state.totalCourses).toEqual(newState.totalCourses);
    });
  });

  describe(`SOURCES_FAIL action`, () => {
    it(`should clear sources and set error`, () => {
      const { initialState } = fromCourses;
      const action = new fromActions.GetSourcesFail('Error');
      const state = fromCourses.reducer(initialState, action);

      expect(state.sources).toEqual([]);
      expect(state.error).toEqual('Error');
      expect(state.courses).toEqual(initialState.courses);
      expect(state.currentCourse).toEqual(initialState.currentCourse);
      expect(state.paths).toEqual(initialState.paths);
      expect(state.totalCourses).toEqual(initialState.totalCourses);
    });
  });

  describe(`SOURCES_SUCCESS action`, () => {
    it(`should populate sources from the array and clear error`, () => {
      const { initialState } = fromCourses;
      const sources: any = ['123', '456'];
      const action = new fromActions.GetSourcesSuccess(sources);
      const state = fromCourses.reducer(initialState, action);

      expect(state.sources).toEqual(sources);
      expect(state.error).toEqual('');
      expect(state.courses).toEqual(initialState.courses);
      expect(state.currentCourse).toEqual(initialState.currentCourse);
      expect(state.paths).toEqual(initialState.paths);
      expect(state.totalCourses).toEqual(initialState.totalCourses);
    });
  });

  describe('TOTAL_FAIL action', () => {
    it(`should set totalCourses to 0 and set error`, () => {
      const newState = {
        ...fromCourses.initialState,
        totalCourses: 10
      };
      const action = new fromActions.GetTotalFail('Error');
      const state = fromCourses.reducer(newState, action);

      expect(state.totalCourses).toBe(0);
      expect(state.error).toEqual('Error');
      expect(state.courses).toEqual(newState.courses);
      expect(state.currentCourse).toEqual(null);
      expect(state.paths).toEqual(newState.paths);
      expect(state.sources).toEqual(newState.sources);
    });
  });

  describe('TOTAL_SUCCESS action', () => {
    it(`should set totalCourses and clear error`, () => {
      const { initialState } = fromCourses;
      const courses: Course[] = [
        { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B', yearCompleted: '2019' },
        { id: 2, title: 'Course 2', instructor: 'Jack', path: 'C', source: 'D', yearCompleted: '2019' }
      ];
      const action = new fromActions.GetTotalSuccess(courses);
      const state = fromCourses.reducer(initialState, action);

      expect(state.totalCourses).toEqual(2);
      expect(state.error).toEqual('');
      expect(state.courses).toEqual(initialState.courses);
      expect(state.currentCourse).toEqual(initialState.currentCourse);
      expect(state.paths).toEqual(initialState.paths);
      expect(state.sources).toEqual(initialState.sources);
    });
  });

});

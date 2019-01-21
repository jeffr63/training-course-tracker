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
    });
  });

  describe(`SAVE_FAIL action`, () => {
    it(`should set error`, () => {
      const { initialState } = fromCourses;
      const action = new fromActions.SaveFail('Error');
      const state = fromCourses.reducer(initialState, action);

      expect(state.error).toEqual('Error');
      expect(state.courses).toEqual(initialState.courses);
      expect(state.currentCourse).toEqual(initialState.currentCourse);
      expect(state.totalCourses).toEqual(initialState.totalCourses);
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
      expect(state.totalCourses).toEqual(newState.totalCourses);
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
    });
  });

});

describe(`Course Reducer Selectors`, () => {
  describe(`getCourses selector`, () => {
    it('should return courses', () => {
      const courses: Course[] = [
        { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B', yearCompleted: '2019' },
        { id: 2, title: 'Course 2', instructor: 'Jack', path: 'C', source: 'D', yearCompleted: '2019' }
      ];
      const previousState = {
        courses: {
          ...fromCourses.initialState,
          courses
        }
      };

      const payload = fromCourses.getCourses(previousState);

      expect(payload).toEqual(courses);
    });
  });

  describe(`getCourse selector`, () => {
    it('should return currentCourse', () => {
      const currentCourse = { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B', yearCompleted: '2019' };
      const previousState = {
        courses: {
          ...fromCourses.initialState,
          currentCourse
        }
      };

      const payload = fromCourses.getCourse(previousState);

      expect(payload).toEqual(currentCourse);
    });
  });

  describe(`saveCourse selector`, () => {
    it('should return currentCourse', () => {
      const currentCourse = { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B', yearCompleted: '2019' };
      const previousState = {
        courses: {
          ...fromCourses.initialState,
          currentCourse
        }
      };

      const payload = fromCourses.saveCourse(previousState);

      expect(payload).toEqual(currentCourse);
    });
  });

  describe(`getTotalCourses selector`, () => {
    it('should return totalCourses', () => {
      const totalCourses = 10;
      const previousState = {
        courses: {
          ...fromCourses.initialState,
          totalCourses
        }
      };

      const payload = fromCourses.getTotalCourses(previousState);

      expect(payload).toEqual(totalCourses);
    });
  });
});

import * as fromSelector from './course.selectors';
import * as fromCourses from './course.reducer';
import { Course, CourseData } from '../../shared/course';


describe(`Course Reducer Selectors`, () => {
  describe(`getCourse selector`, () => {
    it('should return currentCourse', () => {
      const currentCourse: Course = { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B' };
      const previousState = {
        courses: {
          ...fromCourses.initialState,
          currentCourse
        }
      };

      const payload = fromSelector.getCourse(previousState);

      expect(payload).toEqual(currentCourse);
    });
  });

  describe(`saveCourse selector`, () => {
    it('should return currentCourse', () => {
      const currentCourse: Course = { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B' };
      const previousState = {
        courses: {
          ...fromCourses.initialState,
          currentCourse
        }
      };

      const payload = fromSelector.saveCourse(previousState);

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

      const payload = fromSelector.getTotalCourses(previousState);

      expect(payload).toEqual(totalCourses);
    });
  });

  describe(`getCoursesByPath selector`, () => {
    it('should return array of course data', () => {
      const byPath: CourseData[] = [
        { name: 'ABC', value: 1 },
        { name: 'DEF', value: 2 }
      ];
      const previousState = {
        courses: {
          ...fromCourses.initialState,
          coursesByPath: byPath
        }
      };

      const payload = fromSelector.getCoursesByPath(previousState);

      expect(payload).toEqual(byPath);
    });
  });

  describe(`getCoursesBySource selector`, () => {
    it('should return array of course data', () => {
      const bySource: CourseData[] = [
        { name: 'ABC', value: 1 },
        { name: 'DEF', value: 2 }
      ];
      const previousState = {
        courses: {
          ...fromCourses.initialState,
          coursesBySource: bySource
        }
      };

      const payload = fromSelector.getCoursesBySource(previousState);

      expect(payload).toEqual(bySource);
    });
  });

});

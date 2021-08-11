import * as fromMain from './index';
import * as fromCourses from './course/course.reducer';
import * as fromPaths from './paths/paths.reducer';
import * as fromSources from './sources/sources.reducer';
import { Course, CourseData } from '../shared/course';
import { Path } from '../shared/paths';
import { Source } from '../shared/sources';

describe(`Main Reducer Selectors`, () => {
  describe(`getCourse selector`, () => {
    it('should return currentCourse', () => {
      const currentCourse: Course = { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B' };
      const previousState = {
        courses: {
          ...fromCourses.initialState,
          currentCourse
        }
      };

      const payload = fromMain.getCourse(previousState);

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

      const payload = fromMain.saveCourse(previousState);

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

      const payload = fromMain.getTotalCourses(previousState);

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

      const payload = fromMain.getCoursesByPath(previousState);

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

      const payload = fromMain.getCoursesBySource(previousState);

      expect(payload).toEqual(bySource);
    });
  });

  describe(`getCurrentPath selector`, () => {
    it('should return path', () => {
      const currentPath: Path = { id: 1, name: 'ABC' };
      const previousState = {
        paths: {
          ...fromPaths.initialState,
          currentPath
        }
      };

      const payload = fromMain.getCurrentPath(previousState);

      expect(payload).toEqual(currentPath);
    });
  });

  describe(`getPaths selector`, () => {
    it('should return paths', () => {
      const paths: Path[] = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];
      const previousState = {
        paths: {
          ...fromPaths.initialState,
          paths
        }
      };

      const payload = fromMain.getPaths(previousState);

      expect(payload).toEqual(paths);
    });
  });

  describe(`getSources selector`, () => {
    it('should return sources', () => {
      const sources: Source[] = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];
      const previousState = {
        sources: {
          ...fromSources.initialState,
          sources
        }
      };

      const payload = fromMain.getSources(previousState);

      expect(payload).toEqual(sources);
    });
  });

  describe(`getCurrentSource selector`, () => {
    it('should return source', () => {
      const currentSource: Source = { id: 1, name: 'ABC' };
      const previousState = {
        sources: {
          ...fromSources.initialState,
          currentSource
        }
      };

      const payload = fromMain.getCurrentSource(previousState);

      expect(payload).toEqual(currentSource);
    });
  });
});

import * as courseActions from './course.actions';
import { reducer, CourseState } from './course.reducer';

// describe(`course reducer`, () => {

//   describe(`DeleteCourseActionSuccess`, () => {
//     const currentState: CourseState = {
//       courses: [
//         { id: 1, title: 'abc', instructor: 'john', path: 'abc', source: 'abc', yearCompleted: '2000' },
//         { id: 2, title: 'def', instructor: 'jane', path: 'def', source: 'def', yearCompleted: '2001' }
//       ],
//       currentCourse: null,
//       totalCourses: 2,
//       error: 'This should be cleared when successful'
//     };

//     const action = new courseActions.DeleteCourseSuccessAction();
//     const result = reducer(currentState, action);
//     expect(result.error).toEqual('');
//   });

//   describe(`DeleteCourseActionFail`, () => {
//     const currentState: CourseState = {
//       courses: [
//         { id: 1, title: 'abc', instructor: 'john', path: 'abc', source: 'abc', yearCompleted: '2000' },
//         { id: 2, title: 'def', instructor: 'jane', path: 'def', source: 'def', yearCompleted: '2001' }
//       ],
//       currentCourse: null,
//       totalCourses: 2,
//       error: ''
//     };

//     const action = new courseActions.DeleteCourseFailAction('Error');
//     const result = reducer(currentState, action);
//     expect(result.error).toEqual('Error');
//   });
// });

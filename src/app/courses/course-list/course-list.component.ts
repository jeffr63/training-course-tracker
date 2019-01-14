import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Course } from '../course';
import * as fromCourse from '../state/course.reducer';
import * as courseActions from '../state/course.actions';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses$: Observable<Course[]>;
  selectCourse = <Course>{};
  current = 1;
  loading = false;
  pageSize = 3;
  totalCourses$: Observable<number>;
  componentActive = true;

  constructor(
    private store: Store<fromCourse.State>
  ) { }

  ngOnInit() {
    this.store.dispatch(new courseActions.LoadCoursesAction({ 'current': this.current, 'pageSize': this.pageSize }));
    this.store.dispatch(new courseActions.GetTotalCoursesAction());
    this.courses$ = this.store.pipe(select(fromCourse.getCourses));
    this.totalCourses$ = this.store.pipe(select(fromCourse.getTotalCourses));
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  deleteCourse(id) {
    this.store.dispatch(new courseActions.DeleteCourseAction({ 'id': id, 'current': this.current, 'pageSize': this.pageSize }));
  }

  refreshTable() {
    this.store.dispatch(new courseActions.LoadCoursesAction({ 'current': this.current, 'pageSize': this.pageSize }));
  }
}

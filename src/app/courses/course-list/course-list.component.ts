import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Course } from '../course';
import * as fromCourse from '../state/course.reducer';
import * as courseActions from '../state/course.actions';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses$: Observable<Course[]>;
  selectCourse = <Course>{};
  current = 1;
  loading = false;
  pageSize = 3;
  totalCourses$: Observable<number>;
  closedResult = '';

  constructor(
    private store: Store<fromCourse.State>,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.store.dispatch(new courseActions.LoadCoursesAction({ 'current': this.current, 'pageSize': this.pageSize }));
    this.store.dispatch(new courseActions.GetTotalCoursesAction());
    this.courses$ = this.store.pipe(select(fromCourse.getCourses));
    this.totalCourses$ = this.store.pipe(select(fromCourse.getTotalCourses));
  }

  deleteCourse(id, deleteModal) {
    this.modal.open(deleteModal).result.then(result => {
      this.closedResult = `Closed with ${result}`;
      this.store.dispatch(new courseActions.DeleteCourseAction({ 'id': id, 'current': this.current, 'pageSize': this.pageSize }));
    }, (reason) => {
      this.closedResult = `Dismissed with ${reason}`;
    });
  }

  refreshTable() {
    this.store.dispatch(new courseActions.LoadCoursesAction({ 'current': this.current, 'pageSize': this.pageSize }));
  }
}

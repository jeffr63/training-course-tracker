import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faPencilAlt, faTrashAlt, faPlusCircle, faBan } from '@fortawesome/free-solid-svg-icons';


import { Course } from '../../shared/course';
import * as fromCourse from '../../store/reducers';
import * as courseActions from '../../store/actions/course.actions';
import { AuthService } from 'src/app/auth/auth.service';

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
  pageSize = 10;
  totalCourses$: Observable<number>;
  closedResult = '';
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;
  faBan = faBan;

  constructor(
    private store: Store<fromCourse.State>,
    private modal: NgbModal,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.store.dispatch(new courseActions.Load({ 'current': this.current, 'pageSize': this.pageSize }));
    this.store.dispatch(new courseActions.GetTotal());
    this.courses$ = this.store.pipe(select(fromCourse.getCourses));
    this.totalCourses$ = this.store.pipe(select(fromCourse.getTotalCourses));
  }

  deleteCourse(id, deleteModal) {
    this.modal.open(deleteModal).result.then(result => {
      this.closedResult = `Closed with ${result}`;
      this.store.dispatch(new courseActions.Delete({ 'id': id, 'current': this.current, 'pageSize': this.pageSize }));
    }, (reason) => {
      this.closedResult = `Dismissed with ${reason}`;
    });
  }

  refreshTable() {
    this.store.dispatch(new courseActions.Load({ 'current': this.current, 'pageSize': this.pageSize }));
  }
}

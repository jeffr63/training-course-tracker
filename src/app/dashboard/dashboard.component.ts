import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromCourse from '../store/reducers';
import * as courseActions from '../store/actions/course.actions';
import { AuthService } from '../auth/auth.service';
import { CourseData } from '../shared/course';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  courses$: Observable<CourseData[]>
  sources$: Observable<CourseData[]>

  constructor(
    private store: Store<fromCourse.State>,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.store.dispatch(new courseActions.GetTotal());
    this.courses$ = this.store.pipe(select(fromCourse.getCoursesByPath));
    this.sources$ = this.store.pipe(select(fromCourse.getCoursesBySource));
  }

}

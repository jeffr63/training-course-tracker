import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";

import * as fromCourse from "../store/reducers";
import * as courseActions from "../store/actions/course.actions";
import { AuthService } from "../auth/auth.service";
import { CourseData } from "../shared/course";

@Component({
  selector: "app-dashboard",

  template: `
    <section>
      <div class="container-fluid">
        <div class="row first-row">
          <div class="card col-xm-12 col-sm-6">
            <div class="card-body">
              <h4 class="card-title">Completed Courses - Paths</h4>
              <ngx-charts-pie-chart
                [view]="[400, 400]"
                [results]="courses$ | async"
                [labels]="true"
                [doughnut]="true"
                [arcWidth]="0.5"
              >
              </ngx-charts-pie-chart>
            </div>
          </div>

          <div class="card col-xm-12 col-sm-6">
            <div class="card-body">
              <h4 class="card-title">Completed Courses - Sources</h4>
              <ngx-charts-pie-chart
                [view]="[400, 400]"
                [results]="sources$ | async"
                [labels]="true"
                [doughnut]="true"
                [arcWidth]="0.5"
              >
              </ngx-charts-pie-chart>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,

  styles: [],
})
export class DashboardComponent implements OnInit {
  courses$: Observable<CourseData[]>;
  sources$: Observable<CourseData[]>;

  constructor(
    private store: Store<fromCourse.State>,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.store.dispatch(courseActions.getTotalCourses());
    this.courses$ = this.store.pipe(select(fromCourse.getCoursesByPath));
    this.sources$ = this.store.pipe(select(fromCourse.getCoursesBySource));
  }
}

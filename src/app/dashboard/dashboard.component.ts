import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store, select } from '@ngrx/store';

import * as fromRoot from '@store/index';
import { coursesActions } from '@store/course/course.actions';
import { coursesFeature } from '@store/course/course.state';
import { DashboardContentComponent } from './dashboard-content.component';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardContentComponent],
  template: `<app-dashboard-content [paths]="paths()" [sources]="sources()" />`,
})
export class DashboardComponent implements OnInit {
  readonly #store = inject(Store<fromRoot.State>);

  readonly paths = toSignal(this.#store.pipe(select(coursesFeature.selectCoursesByPath)), {
    initialValue: [],
  });
  readonly sources = toSignal(this.#store.pipe(select(coursesFeature.selectCoursesBySource)), {
    initialValue: [],
  });

  ngOnInit() {
    this.#store.dispatch(coursesActions.getTotalCourses());
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store, select } from '@ngrx/store';

import * as fromRoot from '@store/index';
import { coursesActions } from '@store/course/course.actions';
import { coursesFeature } from '@store/course/course.state';
import { DashboardContent } from './dashboard-content';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardContent],
  template: `<app-dashboard-content [paths]="paths()" [sources]="sources()" />`,
})
export class Dashboard implements OnInit {
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';

import { Observable, of } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { Course } from '../course';
import * as fromRoot from '../../store/reducers';
import * as fromCourse from '../state/course.reducer';
import * as courseActions from '../state/course.actions';
import * as fromPaths from '../../store/actions/paths.actions';
import * as fromSources from '../../store/actions/sources.actions';


@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit, OnDestroy {
  course = <Course>{};
  loading = false;
  componentActive = true;
  paths$: Observable<any[]>;
  sources$: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<fromCourse.State>
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id !== 'new') {
        this.store.dispatch(new courseActions.GetCourse(params.id));
        this.store.pipe(select(fromCourse.getCourse), takeWhile(() => this.componentActive))
          .subscribe((course: Course) => this.course = course);
      } else {
        const year = new Date().getFullYear();
        this.course.yearCompleted = year.toString();
      }
    });

    this.store.dispatch(new fromPaths.Load());
    this.paths$ = this.store.pipe(select(fromRoot.getPaths));

    this.store.dispatch(new fromSources.Load());
    this.sources$ = this.store.pipe(select(fromRoot.getSources));
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  save() {
    this.store.dispatch(new courseActions.Save(this.course));
    this.location.back();
  }

}

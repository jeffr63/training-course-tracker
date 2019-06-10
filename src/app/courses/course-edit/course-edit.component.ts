import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import * as courseActions from '../../store/actions/course.actions';
import * as fromRoot from '../../store/reducers';
import * as fromCourse from '../../store/reducers';
import * as fromPaths from '../../store/actions/paths.actions';
import * as fromSources from '../../store/actions/sources.actions';
import { Course } from '../../shared/course';


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
  faSave = faSave;
  faBan = faBan;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id !== 'new') {
        this.store.dispatch(courseActions.getCourse({ id: params.id }));
        this.store.pipe(select(fromCourse.getCourse), takeWhile(() => this.componentActive))
          .subscribe((course: Course) => this.course = course);
      }
    });

    this.store.dispatch(fromPaths.loadPaths());
    this.paths$ = this.store.pipe(select(fromRoot.getPaths));

    this.store.dispatch(fromSources.loadSources());
    this.sources$ = this.store.pipe(select(fromRoot.getSources));
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  save() {
    this.store.dispatch(courseActions.saveCourse({ course: this.course }));
    this.location.back();
  }

}

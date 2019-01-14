import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, switchMap, takeWhile } from 'rxjs/operators';

import { Course } from '../course';
import * as fromCourse from '../state/course.reducer';
import * as courseActions from '../state/course.actions';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit, OnDestroy {
  course = <Course>{};
  loading = false;
  componentActive = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromCourse.State>,
    private coursesService: CoursesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id !== 'new') {
        this.store.dispatch(new courseActions.GetCourseAction(params.id));
        this.store.pipe(select(fromCourse.getCourse), takeWhile(() => this.componentActive))
          .subscribe((course: Course) => this.course = course);
      } else {
        const year = new Date().getFullYear();
        this.course.yearCompleted = year.toString();
      }
    });

  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  pathSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(term => this.coursesService.searchPaths(term)),
      map(paths => _.map(paths, 'name'))
    )

  sourceSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(term => this.coursesService.searchSources(term)),
      map(sources => _.map(sources, 'name'))
    )

  save() {
    this.store.dispatch(new courseActions.SaveCourseAction(this.course));
    this.router.navigate(['/courses']);
  }

}

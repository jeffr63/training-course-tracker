import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { form } from '@angular/forms/signals';

import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromRoot from '@store/index';
import { Course, COURSE_EDIT_SCHEMA } from '@models/course-interface';
import { coursesActions } from '@store/course/course.actions';
import { coursesFeature } from '@store/course/course.state';
import { pathsFeature } from '@store/path/paths.state';
import { sourcesFeature } from '@store/source/sources.state';
import { CourseEditCard } from './course-edit-card';

@Component({
  selector: 'app-course-edit',
  imports: [CourseEditCard],
  template: `<app-course-edit-card
    [form]="form"
    [paths]="paths()"
    [sources]="sources()"
    (cancel)="cancel()"
    (save)="save()" />`,
})
export default class CourseEdit {
  readonly #store = inject(Store<fromRoot.State>);
  readonly #router = inject(Router);

  protected readonly id = input.required<string>();
  protected readonly paths = toSignal(this.#store.select(pathsFeature.selectPaths), { initialValue: [] });
  protected readonly sources = toSignal(this.#store.select(sourcesFeature.selectSources), { initialValue: [] });

  readonly #course = rxResource<Course, string>({
    params: () => this.id(),
    stream: ({ params: id }) => {
      if (this.id() === 'new') return of({ title: '', instructor: '', path: '', source: '' });
      this.#store.dispatch(coursesActions.getCourse({ id: +id }));
      return this.#store.select(coursesFeature.selectCurrentCourse);
    },
  });

  readonly form = form<Course>(this.#course.value, COURSE_EDIT_SCHEMA);

  cancel() {
    this.#router.navigate(['/courses']);
  }

  save() {
    this.#store.dispatch(coursesActions.saveCourse({ course: this.#course.value() }));
    this.#router.navigate(['/courses']);
  }
}

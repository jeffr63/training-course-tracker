import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { Store, select } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as fromRoot from '@store/index';
import { Course } from '@models/course';
import { coursesActions } from '@store/course/course.actions';
import { coursesFeature } from '@store/course/course.state';
import { pathsActions } from '@store/path/paths.actions';
import { pathsFeature } from '@store/path/paths.state';
import { sourcesActions } from '@store/source/sources.actions';
import { sourcesFeature } from '@store/source/sources.state';
import { CourseEditCardComponent } from './course-edit-card.component';

@Component({
  selector: 'app-course-edit',
  imports: [CourseEditCardComponent],
  template: `<app-course-edit-card [(courseEditForm)]="courseEditForm" [paths]="paths()" [sources]="sources()" (cancel)="cancel()" (save)="save()" />`,
})
export default class CourseEditComponent implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #location = inject(Location);
  readonly #store = inject(Store<fromRoot.State>);
  readonly #ref = inject(DestroyRef);
  readonly #router = inject(Router);

  protected readonly id = input.required<string>();
  protected readonly paths = toSignal(this.#store.pipe(select(pathsFeature.selectPaths)), { initialValue: [] });
  protected readonly sources = toSignal(this.#store.pipe(select(sourcesFeature.selectSources)), { initialValue: [] });
  protected courseEditForm: FormGroup;
  #course = <Course>{};

  ngOnInit() {
    this.courseEditForm = this.#fb.group({
      title: ['', Validators.required],
      instructor: ['', Validators.required],
      path: ['', Validators.required],
      source: ['', Validators.required],
    });

    this.#store.dispatch(pathsActions.loadPaths());
    this.#store.dispatch(sourcesActions.loadSources());

    if (this.id() === 'new') return;

    this.#store.dispatch(coursesActions.getCourse({ id: +this.id() }));
    this.#store
      .pipe(select(coursesFeature.selectCurrentCourse))
      .pipe(takeUntilDestroyed(this.#ref))
      .subscribe((course: Course) => {
        this.#course = { ...course };
        this.courseEditForm.get('title').setValue(this.#course.title);
        this.courseEditForm.get('instructor').setValue(this.#course.instructor);
        this.courseEditForm.get('path').setValue(this.#course.path);
        this.courseEditForm.get('source').setValue(this.#course.source);
      });
  }

  cancel() {
    this.#router.navigate(['/courses']);
  }

  save() {
    this.#course.title = this.courseEditForm.controls.title.value;
    this.#course.instructor = this.courseEditForm.controls.instructor.value;
    this.#course.path = this.courseEditForm.controls.path.value;
    this.#course.source = this.courseEditForm.controls.source.value;
    this.#store.dispatch(coursesActions.saveCourse({ course: this.#course }));
    this.#location.back();
  }
}

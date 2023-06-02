import { RouterLink } from '@angular/router';
import { Component, OnInit, OnDestroy, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, Location, NgForOf, NgIf } from '@angular/common';

import { Store, select } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as fromRoot from '@store/index';
import * as courseActions from '@store/course/course.actions';
import * as courseSelectors from '@store/course/course.selectors';
import * as pathsActions from '@store/paths/paths.actions';
import * as pathsSelectors from '@store/paths/paths.selectors';
import * as sourcesActions from '@store/sources/sources.actions';
import * as sourcesSelectors from '@store/sources/sources.selectors';
import { Course } from '@models/course';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-course-edit',
  standalone: true,
  imports: [AsyncPipe, NgForOf, NgIf, NgbModule, ReactiveFormsModule, RouterLink],

  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="courseEditForm" [formGroup]="courseEditForm">
          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="title">Title</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                formControlName="title"
                placeholder="Enter title of course taken"
              />
              <div *ngIf="courseEditForm.controls.title.errors?.required && courseEditForm.controls.title.touched">
                <small class="text-danger">Title is required</small>
              </div>
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="instructor">Instructor</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                formControlName="instructor"
                placeholder="Enter name of course's intructor"
              />
              <div
                *ngIf="
                  courseEditForm.controls.instructor.errors?.required && courseEditForm.controls.instructor.touched
                "
              >
                <small class="text-danger">Instructor is required</small>
              </div>
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="path">Path</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                formControlName="path"
                list="path-helpers"
                placeholder="Enter techical path of course (ex: Angular or React)"
              />
              <datalist id="path-helpers">
                <div *ngFor="let path of paths()">
                  <option value="{{ path.name }}"></option>
                </div>
              </datalist>
              <div *ngIf="courseEditForm.controls.path.errors?.required && courseEditForm.controls.path.touched">
                <small class="text-danger">Path is required</small>
              </div>
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="source">Source</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                formControlName="source"
                list="source-helpers"
                placeholder="Enter where the course was sourced from (ex: Pluralsite)"
              />
              <datalist id="source-helpers">
                <div *ngFor="let source of sources()">
                  <option value="{{ source.name }}"></option>
                </div>
              </datalist>
              <div *ngIf="courseEditForm.controls.source.errors?.required && courseEditForm.controls.source.touched">
                <small class="text-danger">Source is required</small>
              </div>
            </div>
          </fieldset>

          <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
            <button class="btn btn-primary me-sm-2" (click)="save()" title="Save" [disabled]="!courseEditForm.valid">
              <i class="bi bi-save"></i> Save
            </button>
            <a class="btn btn-secondary" [routerLink]="['/courses']"> <i class="bi bi-x-circle"></i> Cancel </a>
          </div>
        </form>
      </section>
    </section>
  `,

  styles: [
    `
      section .card {
        margin-top: 30px;
        padding-left: 15px;
        padding-right: 15px;
      }

      .form-buttons {
        margin-left: 3px;
      }
    `,
  ],
})
export default class CourseEditComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private location = inject(Location);
  private store = inject(Store<fromRoot.State>);

  @Input() id;
  destroy$ = new ReplaySubject<void>(1);
  paths = toSignal(this.store.pipe(select(pathsSelectors.getPaths)), { initialValue: [] });
  sources = toSignal(this.store.pipe(select(sourcesSelectors.getSources)), { initialValue: [] });
  courseEditForm: FormGroup;
  course = <Course>{};

  ngOnInit() {
    this.courseEditForm = this.fb.group({
      title: ['', Validators.required],
      instructor: ['', Validators.required],
      path: ['', Validators.required],
      source: ['', Validators.required],
    });

    this.store.dispatch(pathsActions.loadPaths());
    this.store.dispatch(sourcesActions.loadSources());

    if (this.id === 'new') return;

    this.store.dispatch(courseActions.getCourse({ id: +this.id }));
    this.store
      .pipe(select(courseSelectors.getCourse))
      .pipe(takeUntil(this.destroy$))
      .subscribe((course: Course) => {
        this.course = { ...course };
        this.courseEditForm.get('title').setValue(this.course.title);
        this.courseEditForm.get('instructor').setValue(this.course.instructor);
        this.courseEditForm.get('path').setValue(this.course.path);
        this.courseEditForm.get('source').setValue(this.course.source);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  save() {
    this.course.title = this.courseEditForm.controls.title.value;
    this.course.instructor = this.courseEditForm.controls.instructor.value;
    this.course.path = this.courseEditForm.controls.path.value;
    this.course.source = this.courseEditForm.controls.source.value;
    this.store.dispatch(courseActions.saveCourse({ course: this.course }));
    this.location.back();
  }
}

import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, Location, NgForOf, NgIf } from '@angular/common';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as fromRoot from '@store/index';
import * as courseActions from '@store/course/course.actions';
import * as courseSelectors from '@store/course/course.selectors';
import * as pathsActions from '@store/paths/paths.actions';
import * as pathsSelectors from '@store/paths/paths.selectors';
import * as sourcesActions from '@store/sources/sources.actions';
import * as sourcesSelectors from '@store/sources/sources.selectors';
import { Course } from '@courses/models/course';

@Component({
  selector: 'app-course-edit',
  standalone: true,
  imports: [AsyncPipe, NgForOf, NgIf, NgbModule, ReactiveFormsModule, RouterLinkWithHref],

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
                <div *ngFor="let path of paths$ | async">
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
                <div *ngFor="let source of sources$ | async">
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
export class CourseEditComponent implements OnInit, OnDestroy {
  loading = false;
  componentActive = true;
  paths$: Observable<any[]>;
  sources$: Observable<any[]>;
  courseEditForm: FormGroup;
  private course = <Course>{};

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<fromRoot.State>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.courseEditForm = this.fb.group({
      title: ['', Validators.required],
      instructor: ['', Validators.required],
      path: ['', Validators.required],
      source: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      if (params.id !== 'new') {
        this.store.dispatch(courseActions.getCourse({ id: params.id }));
        this.store
          .pipe(
            select(courseSelectors.getCourse),
            takeWhile(() => this.componentActive)
          )
          .subscribe((course: Course) => {
            this.course = { ...course };
            this.courseEditForm.get('title').setValue(this.course.title);
            this.courseEditForm.get('instructor').setValue(this.course.instructor);
            this.courseEditForm.get('path').setValue(this.course.path);
            this.courseEditForm.get('source').setValue(this.course.source);
          });
      }
    });

    this.store.dispatch(pathsActions.loadPaths());
    this.paths$ = this.store.pipe(select(pathsSelectors.getPaths));

    this.store.dispatch(sourcesActions.loadSources());
    this.sources$ = this.store.pipe(select(sourcesSelectors.getSources));
  }

  ngOnDestroy() {
    this.componentActive = false;
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

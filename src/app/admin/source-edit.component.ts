import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '@store/index';
import { sourcesActions } from '@store/sources/sources.actions';
import { sourcesFeature } from '@store/sources/sources.state';
import { Source } from '@models/sources';

@Component({
    selector: 'app-source-edit',
    imports: [NgbModule, ReactiveFormsModule, RouterLink],
    template: `
    <section class="container">
      <section class="card">
        @if (sourceEditForm) {
        <form [formGroup]="sourceEditForm">
          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="name">Source Name</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="name" placeholder="Enter source name" />
              @if (sourceEditForm.controls.name.errors?.required && sourceEditForm.controls.name.touched) {
              <small class="text-danger">Name is required</small>
              }
            </div>
          </fieldset>

          <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
            <button class="btn btn-primary me-sm-2" (click)="save()" title="Save" [disabled]="!sourceEditForm.valid"><i class="bi bi-save"></i> Save</button>
            <a class="btn btn-secondary" [routerLink]="['/admin/sources']" title="Cancel"> <i class="bi bi-x-circle"></i> Cancel </a>
          </div>
        </form>
        }
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
    ]
})
export default class SourceEditComponent implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #location = inject(Location);
  readonly #store = inject(Store<fromRoot.State>);
  readonly #ref = inject(DestroyRef);

  protected readonly id = input.required<string>();
  protected sourceEditForm: FormGroup;
  #source = <Source>{};

  ngOnInit() {
    this.sourceEditForm = this.#fb.group({
      name: ['', Validators.required],
    });

    if (this.id() === 'new') return;

    this.#store.dispatch(sourcesActions.getSource({ id: +this.id() }));
    this.#store
      .pipe(select(sourcesFeature.selectCurrentSource))
      .pipe(takeUntilDestroyed(this.#ref))
      .subscribe((source: Source) => {
        this.#source = { ...source };
        this.sourceEditForm.get('name').setValue(this.#source.name);
      });
  }

  save() {
    this.#source.name = this.sourceEditForm.controls.name.value;
    this.#store.dispatch(sourcesActions.saveSource({ source: this.#source }));
    this.#location.back();
  }
}

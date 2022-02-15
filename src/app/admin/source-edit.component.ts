import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import * as fromRoot from '../store';
import * as sourcesSelectors from '../store/sources/sources.selectors';
import * as sourcesActions from '../store/sources/sources.actions';
import { Source } from '../shared/sources';

@Component({
  selector: 'app-source-edit',

  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="sourceEditForm" [formGroup]="sourceEditForm">
          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="name">Source Name</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="name" placeholder="Enter source name" />
              <div *ngIf="sourceEditForm.controls.name.errors?.required && sourceEditForm.controls.name.touched">
                <small class="text-danger">Name is required</small>
              </div>
            </div>
          </fieldset>

          <div class="form-group row form-buttons">
            <button class="btn btn-primary mr-sm-2" (click)="save()" title="Save" [disabled]="!sourceEditForm.valid">
              <fa-icon [icon]="faSave"></fa-icon> Save
            </button>
            <a class="btn btn-secondary" [routerLink]="['/admin/sources']" title="Cancel">
              <fa-icon [icon]="faBan"></fa-icon> Cancel
            </a>
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
export class SourceEditComponent implements OnInit, OnDestroy {
  componentActive = true;
  faSave = faSave;
  faBan = faBan;
  sourceEditForm: FormGroup;
  private source = <Source>{};

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<fromRoot.State>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.sourceEditForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      if (params.id !== 'new') {
        this.store.dispatch(sourcesActions.getSource({ id: params.id }));
        this.store
          .pipe(
            select(sourcesSelectors.getCurrentSource),
            takeWhile(() => this.componentActive)
          )
          .subscribe((source: Source) => {
            this.source = { ...source };
            this.sourceEditForm.get('name').setValue(this.source.name);
          });
      }
    });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  save() {
    this.source.name = this.sourceEditForm.controls.name.value;
    this.store.dispatch(sourcesActions.saveSource({ source: this.source }));
    this.location.back();
  }
}

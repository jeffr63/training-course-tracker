import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Location, NgIf } from '@angular/common';

import { takeWhile } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as fromRoot from '@store/index';
import * as pathsActions from '@store/paths/paths.actions';
import * as pathsSelectors from '@store/paths/paths.selectors';
import { Path } from '@admin/paths/models/paths';

@Component({
  selector: 'app-path-edit',
  standalone: true,
  imports: [NgIf, NgbModule, ReactiveFormsModule, RouterLinkWithHref],

  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="pathEditForm" [formGroup]="pathEditForm">
          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="name">Path Name</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="name" placeholder="Enter path name" />
              <div *ngIf="pathEditForm.controls.name.errors?.required && pathEditForm.controls.name.touched">
                <small class="text-danger">Name is required</small>
              </div>
            </div>
          </fieldset>

          <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
            <button class="btn btn-primary me-sm-2" (click)="save()" title="Save" [disabled]="!pathEditForm.valid">
              <i class="bi bi-save"></i> Save
            </button>
            <a class="btn btn-secondary" [routerLink]="['/admin/paths']" title="Cancel">
              <i class="bi bi-x-circle"></i> Cancel
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
export class PathEditComponent implements OnInit, OnDestroy {
  componentActive = true;
  pathEditForm!: FormGroup;
  private path = <Path>{};

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<fromRoot.State>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.pathEditForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      if (params.id !== 'new') {
        this.store.dispatch(pathsActions.getPath({ id: params.id }));
        this.store
          .pipe(
            select(pathsSelectors.getCurrentPath),
            takeWhile(() => this.componentActive)
          )
          .subscribe((path: Path) => {
            this.path = { ...path };
            this.pathEditForm.get('name').setValue(this.path.name);
          });
      }
    });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  save() {
    this.path.name = this.pathEditForm.controls.name.value;
    this.store.dispatch(pathsActions.savePath({ path: this.path }));
    this.location.back();
  }
}

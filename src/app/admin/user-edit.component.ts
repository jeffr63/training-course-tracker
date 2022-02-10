import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import * as fromRoot from '../store';
import * as userSelectors from '../store/users/users.selectors';
import * as userActions from '../store/users/users.actions';
import { User } from '../shared/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="user">
          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="name">Name</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                name="name"
                [(ngModel)]="user.name"
                placeholder="Enter user's name"
              />
            </div>
          </fieldset>

          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="email">Email</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                name="email"
                [(ngModel)]="user.email"
                placeholder="Enter email address"
              />
            </div>
          </fieldset>

          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="email">Roles</label>
            <div class="form-group form-radio col-sm-3" style="margin-left:20px">
              <input
                type="radio"
                class="form-check-input"
                id="role1"
                value="admin"
                name="role"
                [(ngModel)]="user.role"
              />
              <label class="form-check-label" for="check1">Admin</label>
            </div>
            <div class="form-group form-radio col-sm-3">
              <input
                type="radio"
                class="form-check-input"
                value="user"
                id="role2"
                name="role"
                [(ngModel)]="user.role"
              />
              <label class="form-check-label" for="check1">User</label>
            </div>
          </fieldset>

          <div class="form-group row form-buttons">
            <button class="btn btn-primary mr-sm-2" (click)="save()" title="Save">
              <fa-icon [icon]="faSave"></fa-icon> Save
            </button>
            <a class="btn btn-secondary" [routerLink]="['/admin/users']" title="Cancel">
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
export class UserEditComponent implements OnInit, OnDestroy {
  user = <User>{};
  componentActive = true;
  faSave = faSave;
  faBan = faBan;
  private sub = new Subscription();

  constructor(private route: ActivatedRoute, private location: Location, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.sub.add(
      this.route.params.subscribe((params) => {
        this.store.dispatch(userActions.getUser({ id: params.id }));
        this.store
          .pipe(
            select(userSelectors.getCurrentUser),
            takeWhile(() => this.componentActive)
          )
          .subscribe((user: User) => (this.user = { ...user }));
      })
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
    this.sub.unsubscribe();
  }

  save() {
    const patchData = {
      email: this.user.email,
      name: this.user.name,
      role: this.user.role,
    };

    this.store.dispatch(userActions.patchUser({ id: this.user.id, user: patchData }));
    this.location.back();
  }
}

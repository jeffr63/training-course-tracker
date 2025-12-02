import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Store, select } from '@ngrx/store';

import * as fromRoot from '@store/index';
import { usersActions } from '@store/user/users.actions';
import { usersFeature } from '@store/user/users.state';
import { User } from '@models/user-interface';
import { UserEditCard } from './user-edit-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  imports: [UserEditCard],
  template: `<app-user-edit-card [(userEditForm)]="userEditForm" (cancel)="cancel()" (save)="save()" />`,
})
export default class UserEdit implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #location = inject(Location);
  readonly #store = inject(Store<fromRoot.State>);
  readonly #ref = inject(DestroyRef);
  readonly #router = inject(Router);

  protected readonly id = input.required<string>();
  protected userEditForm!: FormGroup;
  #user = <User>{};

  ngOnInit() {
    this.userEditForm = this.#fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });

    this.#store.dispatch(usersActions.getUser({ id: +this.id() }));
    this.#store
      .pipe(select(usersFeature.selectCurrentUser))
      .pipe(takeUntilDestroyed(this.#ref))
      .subscribe((user: User) => {
        this.#user = { ...user };
        this.userEditForm.get('name').setValue(this.#user.name);
        this.userEditForm.get('email').setValue(this.#user.email);
        this.userEditForm.get('role').setValue(this.#user.role);
      });
  }

  cancel() {
    this.#router.navigate(['/admin/users']);
  }

  save() {
    const patchData = {
      email: this.userEditForm.controls.email.value,
      name: this.userEditForm.controls.name.value,
      role: this.userEditForm.controls.role.value,
    };

    this.#store.dispatch(usersActions.patchUser({ id: this.#user.id, user: patchData }));
    this.#location.back();
  }
}

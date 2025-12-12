import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { form } from '@angular/forms/signals';
import { rxResource } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromRoot from '@store/index';
import { usersActions } from '@store/user/users.actions';
import { usersFeature } from '@store/user/users.state';
import { User, USER_EDIT_SCHEMA } from '@models/user-interface';
import { UserEditCard } from './user-edit-card';

@Component({
  selector: 'app-user-edit',
  imports: [UserEditCard],
  template: `<app-user-edit-card [form]="form" (cancel)="cancel()" (save)="save()" />`,
})
export default class UserEdit {
  readonly #store = inject(Store<fromRoot.State>);
  readonly #router = inject(Router);

  protected readonly id = input.required<string>();

  readonly #user = rxResource<User, string>({
    params: () => this.id(),
    stream: ({ params: id }) => {
      if (id === 'new') return of({ name: '', email: '', role: '', password: '' });

      this.#store.dispatch(usersActions.getUser({ id: +id }));
      return this.#store.select(usersFeature.selectCurrentUser);
    },
  });

  readonly form = form(this.#user.value, USER_EDIT_SCHEMA);

  cancel() {
    this.#router.navigate(['/admin/users']);
  }

  save() {
    const patchData = {
      email: this.form().value().email,
      name: this.form().value().name,
      role: this.form().value().role,
    };

    this.#store.dispatch(usersActions.patchUser({ id: +this.id(), user: patchData }));
    this.#router.navigate(['/admin/users']);
  }
}

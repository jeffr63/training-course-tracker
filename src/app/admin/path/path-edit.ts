import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { form } from '@angular/forms/signals';
import { rxResource } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromRoot from '@store/index';
import { pathsActions } from '@store/path/paths.actions';
import { pathsFeature } from '@store/path/paths.state';
import { Path, PATH_EDIT_SCHEMA } from '@models/paths-interface';
import { PathEditCard } from './path-edit-card';

@Component({
  selector: 'app-path-edit',
  imports: [PathEditCard],
  template: `<app-path-edit-card [form]="form" (cancel)="cancel()" (save)="save()" />`,
})
export default class PathEdit {
  readonly #store = inject(Store<fromRoot.State>);
  readonly #router = inject(Router);

  protected readonly id = input.required<string>();

  readonly #path = rxResource<Path, string>({
    params: () => this.id(),
    stream: ({ params: id }) => {
      if (id === 'new') return of({ name: '' });

      this.#store.dispatch(pathsActions.getPath({ id: +this.id() }));
      return this.#store.select(pathsFeature.selectCurrentPath);
    },
  });

  protected form = form(this.#path.value, PATH_EDIT_SCHEMA);

  protected cancel() {
    this.#router.navigate(['/admin/paths']);
  }
  protected save() {
    this.#store.dispatch(pathsActions.savePath({ path: this.#path.value() }));
    this.#router.navigate(['/admin/paths']);
  }
}

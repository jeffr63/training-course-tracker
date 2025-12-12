import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { Store, select } from '@ngrx/store';

import * as fromRoot from '@store/index';
import { sourcesActions } from '@store/source/sources.actions';
import { sourcesFeature } from '@store/source/sources.state';
import { Source, SOURCE_EDIT_SCHEMA } from '@models/sources-interface';
import { Router } from '@angular/router';
import { SourceEditCard } from './source-edit-card';
import { form } from '@angular/forms/signals';
import { of } from 'rxjs';

@Component({
  selector: 'app-source-edit',
  imports: [SourceEditCard],
  template: `<app-source-edit-card [form]="form" (cancel)="cancel()" (save)="save()" />`,
})
export default class SourceEdit {
  readonly #store = inject(Store<fromRoot.State>);
  readonly #router = inject(Router);

  protected readonly id = input.required<string>();

  readonly #source = rxResource<Source, string>({
    params: () => this.id(),
    stream: ({ params: id }) => {
      if (id === 'new') return of({ name: '' });

      this.#store.dispatch(sourcesActions.getSource({ id: +this.id() }));
      return this.#store.select(sourcesFeature.selectCurrentSource);
    }
});

  readonly form = form<Source>(this.#source.value, SOURCE_EDIT_SCHEMA);

  cancel() {
    this.#router.navigate(['/admin/sources']);
  }

  save() {
    this.#store.dispatch(sourcesActions.saveSource({ source: this.#source.value() }));
    this.#router.navigate(['/admin/sources']);
  }
}

import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Store, select } from '@ngrx/store';

import * as fromRoot from '@store/index';
import { sourcesActions } from '@store/source/sources.actions';
import { sourcesFeature } from '@store/source/sources.state';
import { Source } from '@models/sources';
import { Router } from '@angular/router';
import { SourceEditCardComponent } from './source-edit-card.component';

@Component({
  selector: 'app-source-edit',
  imports: [SourceEditCardComponent],
  template: `<app-source-edit-card [(sourceEditForm)]="sourceEditForm" (cancel)="cancel()" (save)="save()" />`,
})
export default class SourceEditComponent implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #location = inject(Location);
  readonly #store = inject(Store<fromRoot.State>);
  readonly #ref = inject(DestroyRef);
  readonly #router = inject(Router);

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

  cancel() {
    this.#router.navigate(['/admin/sources']);
  }

  save() {
    this.#source.name = this.sourceEditForm.controls.name.value;
    this.#store.dispatch(sourcesActions.saveSource({ source: this.#source }));
    this.#location.back();
  }
}

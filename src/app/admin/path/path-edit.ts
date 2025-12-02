import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Store, select } from '@ngrx/store';

import * as fromRoot from '@store/index';
import { pathsActions } from '@store/path/paths.actions';
import { pathsFeature } from '@store/path/paths.state';
import { Path } from '@models/paths-interface';
import { PathEditCard } from './path-edit-card';

@Component({
  selector: 'app-path-edit',
  imports: [PathEditCard],
  template: `<app-path-edit-card [(pathEditForm)]="pathEditForm" (cancel)="cancel()" (save)="save()" />`,
})
export default class PathEdit implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #location = inject(Location);
  readonly #store = inject(Store<fromRoot.State>);
  readonly #ref = inject(DestroyRef);
  readonly #router = inject(Router);

  protected readonly id = input.required<string>();
  protected pathEditForm!: FormGroup;
  #path = <Path>{};

  ngOnInit() {
    this.pathEditForm = this.#fb.group({
      name: ['', Validators.required],
    });

    if (this.id() === 'new') return;

    this.#store.dispatch(pathsActions.getPath({ id: +this.id() }));
    this.#store
      .pipe(select(pathsFeature.selectCurrentPath))
      .pipe(takeUntilDestroyed(this.#ref))
      .subscribe((path: Path) => {
        this.#path = { ...path };
        this.pathEditForm.get('name').setValue(this.#path.name);
      });
  }

  protected cancel() {
    this.#router.navigate(['/admin/paths']);
  }
  protected save() {
    this.#path.name = this.pathEditForm.controls.name.value;
    this.#store.dispatch(pathsActions.savePath({ path: this.#path }));
    this.#location.back();
  }
}

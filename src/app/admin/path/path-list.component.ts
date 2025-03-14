import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '@store/index';
import { pathsFeature } from '@store/path/paths.state';
import { pathsActions } from '@store/path/paths.actions';
import { DeleteComponent } from '@modals/delete.component';
import { ListDisplayComponent } from '@shared/components/list-display.component';
import { ListHeaderComponent } from '@shared/components/list-header.component';
import { ModalDataService } from '@modals/modal-data.service';

@Component({
  selector: 'app-path-list',
  imports: [AsyncPipe, NgbModule, ListDisplayComponent, ListHeaderComponent],
  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Paths</h1>
        </header>

        <section class="card-body">
          <app-list-header (newItem)="newPath()"></app-list-header>

          <app-list-display
            [headers]="headers"
            [columns]="columns"
            [items]="paths$ | async"
            [isAuthenticated]="isAuthenticated"
            (deleteItem)="deletePath($event)"
            (editItem)="editPath($event)"></app-list-display>
        </section>
      </section>
    </section>
  `,
  styles: ['header { padding-bottom: 10px; }'],
})
export default class PathListComponent implements OnInit {
  readonly #modal = inject(NgbModal);
  readonly #modalDataService = inject(ModalDataService);
  readonly #router = inject(Router);
  readonly #store = inject(Store<fromRoot.State>);

  protected columns = ['name'];
  protected headers = ['Path'];
  protected readonly isAuthenticated = true;
  protected paths$: Observable<any[]>;

  ngOnInit() {
    this.#store.dispatch(pathsActions.loadPaths());
    this.paths$ = this.#store.pipe(select(pathsFeature.selectPaths));
  }

  deletePath(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this path?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.#modalDataService.setDeleteModalOptions(modalOptions);
    this.#modal.open(DeleteComponent).result.then((_result) => {
      this.#store.dispatch(pathsActions.deletePath({ id: id }));
    });
  }

  editPath(id: number) {
    this.#router.navigate(['/admin/paths', id]);
  }

  newPath() {
    this.#router.navigate(['/admin/paths/new']);
  }
}

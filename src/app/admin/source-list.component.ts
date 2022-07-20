import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as fromRoot from '../store';
import * as sourcesSelectors from '../store/sources/sources.selectors';
import * as sourcesActions from '../store/sources/sources.actions';
import { DeleteComponent } from '../modals/delete.component';
import { ModalDataService } from './../modals/modal-data.service';
import { Source } from '../shared/sources';

@Component({
  selector: 'app-source-list',

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Sources</h1>
        </header>
        <section class="card-body">
          <header class="row">
            <div class="col">&nbsp;</div>
            <div class="col">
              <a [routerLink]="['/admin/sources/new']" title="Add Source">
                <i class="bi bi-plus-circle-fill display-6 text-success"></i>
                <span class="sr-only">Add Source</span>
              </a>
            </div>
          </header>
          <table class="table table-striped">
            <thead>
              <th>Source</th>
              <th>&nbsp;</th>
            </thead>
            <tbody>
              <tr *ngFor="let source of source$ | async">
                <td>{{ source.name }}</td>
                <td>
                  <a [routerLink]="['/admin/sources', source.id]" class="btn btn-info btn-sm me-2" title="Edit">
                    <i class="bi bi-pencil-fill"></i>
                  </a>
                  <button class="btn btn-danger btn-sm" (click)="deleteSource(source.id)" title="Delete">
                    <i class="bi bi-trash3-fill"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    </section>
  `,

  styles: [
    `
      header {
        padding-bottom: 10px;
      }
    `,
  ],
})
export class SourceListComponent implements OnInit {
  source$: Observable<any[]>;
  selectPath = <Source>{};

  constructor(
    private store: Store<fromRoot.State>,
    private modal: NgbModal,
    private modalDataService: ModalDataService
  ) {}

  ngOnInit() {
    this.store.dispatch(sourcesActions.loadSources());
    this.source$ = this.store.pipe(select(sourcesSelectors.getSources));
  }

  deleteSource(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this source?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((_result) => {
      this.store.dispatch(sourcesActions.deleteSource({ id }));
    });
  }
}

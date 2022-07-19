import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faPencilAlt, faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { DeleteComponent } from './../modals/delete.component';
import { ModalDataService } from './../modals/modal-data.service';
import { Path } from '../shared/paths';
import * as fromRoot from '../store';
import * as pathsSelectors from '../store/paths/paths.selectors';
import * as pathsActions from '../store/paths/paths.actions';

@Component({
  selector: 'app-path-list',

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Paths</h1>
        </header>
        <section class="card-body">
          <header class="row">
            <div class="col">&nbsp;</div>
            <div class="col">
              <a [routerLink]="['/admin/paths/new']" title="Add Path">
                <fa-icon [icon]="faPlusCircle" class="fa-2x text-success"></fa-icon>
              </a>
            </div>
          </header>
          <table class="table table-striped">
            <thead>
              <th>Path</th>
              <th>&nbsp;</th>
            </thead>
            <tbody>
              <tr *ngFor="let path of paths$ | async">
                <td>{{ path.name }}</td>
                <td>
                  <a [routerLink]="['/admin/paths', path.id]" class="btn btn-info btn-sm me-2" title="Edit">
                    <fa-icon [icon]="faPencilAlt"></fa-icon>
                  </a>
                  <button class="btn btn-danger btn-sm" (click)="deletePath(path.id)" title="Delete">
                    <fa-icon [icon]="faTrashAlt"></fa-icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    </section>
  `,

  styles: ['header { padding-bottom: 10px; }'],
})
export class PathListComponent implements OnInit {
  paths$: Observable<any[]>;
  selectPath = <Path>{};
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;

  constructor(
    private store: Store<fromRoot.State>,
    private modal: NgbModal,
    private modalDataService: ModalDataService
  ) {}

  ngOnInit() {
    this.store.dispatch(pathsActions.loadPaths());
    this.paths$ = this.store.pipe(select(pathsSelectors.getPaths));
  }

  deletePath(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this path?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((_result) => {
      this.store.dispatch(pathsActions.deletePath({ id: id }));
    });
  }
}

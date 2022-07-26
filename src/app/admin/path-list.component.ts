import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DeleteComponent } from './../modals/delete.component';
import { ModalDataService } from './../modals/modal-data.service';
import { Path } from '../models/paths';
import * as fromRoot from '../store';
import * as pathsSelectors from '../store/paths/paths.selectors';
import * as pathsActions from '../store/paths/paths.actions';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListHeaderComponent } from '../shared/list-header.component';
import { ListDisplayComponent } from '../shared/list-display.component';

@Component({
  selector: 'app-path-list',
  standalone: true,
  imports: [CommonModule, NgbModule, ListDisplayComponent, ListHeaderComponent],

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
            (editItem)="editPath($event)"
          ></app-list-display>
        </section>
      </section>
    </section>
  `,

  styles: ['header { padding-bottom: 10px; }'],
})
export class PathListComponent implements OnInit {
  columns = ['name'];
  headers = ['Path'];
  isAuthenticated = true;
  paths$: Observable<any[]>;
  selectPath = <Path>{};

  constructor(
    private store: Store<fromRoot.State>,
    private modal: NgbModal,
    private modalDataService: ModalDataService,
    private router: Router
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

  editPath(id: number) {
    this.router.navigate(['/admin/paths', id]);
  }

  newPath() {
    this.router.navigate(['/admin/paths/new']);
  }
}

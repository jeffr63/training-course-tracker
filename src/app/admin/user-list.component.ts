import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as fromRoot from '../store';
import * as userSelectors from '../store/users/users.selectors';
import * as userActions from '../store/users/users.actions';
import { DeleteComponent } from './../modals/delete.component';
import { ModalDataService } from './../modals/modal-data.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Users</h1>
        </header>

        <section class="card-body">
          <app-list-display
            [headers]="headers"
            [columns]="columns"
            [items]="users$ | async"
            [isAuthenticated]="isAuthenticated"
            (deleteItem)="deleteUser($event)"
            (editItem)="editUser($event)"
          ></app-list-display>
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
export class UserListComponent implements OnInit {
  columns = ['name', 'email', 'role'];
  headers = ['Name', 'Email', 'Role'];
  isAuthenticated = true;
  users$: Observable<any[]>;
  selectedUser = <User>{};

  constructor(
    private store: Store<fromRoot.State>,
    private modal: NgbModal,
    private modalDataService: ModalDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(userActions.loadUsers());
    this.users$ = this.store.pipe(select(userSelectors.getUsers));
  }

  deleteUser(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this user?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((_result) => {
      this.store.dispatch(userActions.deleteUser({ id }));
    });
  }

  editUser(id: number) {
    this.router.navigate(['/admin/users', id]);
  }
}

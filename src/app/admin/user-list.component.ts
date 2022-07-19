import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import * as fromRoot from '../store';
import * as userSelectors from '../store/users/users.selectors';
import * as userActions from '../store/users/users.actions';
import { DeleteComponent } from './../modals/delete.component';
import { ModalDataService } from './../modals/modal-data.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-users-list',

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Users</h1>
        </header>
        <section class="card-body">
          <table class="table table-striped">
            <thead>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>&nbsp;</th>
            </thead>
            <tbody>
              <tr *ngFor="let user of users$ | async">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <a [routerLink]="['/admin/users', user.id]" class="btn btn-info btn-sm me-2" title="Edit">
                    <fa-icon [icon]="faPencilAlt"></fa-icon>
                    <span class="sr-only">Edit</span>
                  </a>
                  <button class="btn btn-danger btn-sm" (click)="deleteUser(user.id)" title="Delete">
                    <fa-icon [icon]="faTrashAlt"></fa-icon>
                    <span class="sr-only">Delete</span>
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
export class UserListComponent implements OnInit {
  users$: Observable<any[]>;
  selectedUser = <User>{};
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;

  constructor(
    private store: Store<fromRoot.State>,
    private modal: NgbModal,
    private modalDataService: ModalDataService
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
}

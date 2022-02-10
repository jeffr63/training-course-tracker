import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPencilAlt, faTrashAlt, faBan } from '@fortawesome/free-solid-svg-icons';

import * as fromRoot from '../store';
import * as userSelectors from '../store/users/users.selectors';
import * as userActions from '../store/users/users.actions';
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
                  <a [routerLink]="['/admin/users', user.id]" class="btn btn-info btn-sm mr-2" title="Edit">
                    <fa-icon [icon]="faPencilAlt"></fa-icon>
                    <span class="sr-only">Edit</span>
                  </a>
                  <button class="btn btn-danger btn-sm" (click)="deleteUser(user.id, deleteModal)" title="Delete">
                    <fa-icon [icon]="faTrashAlt"></fa-icon>
                    <span class="sr-only">Delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>

      <ng-template #deleteModal let-modal>
        <div class="modal-header">
          <span class="modal-title">Delete?</span>
        </div>
        <div class="modal-body">
          <p><strong>Are you sure you want to delete this source?</strong></p>
          <p>
            All information associated to this source will be permanently deleted.
            <span class="text-danger">This operation can not be undone.</span>
          </p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" (click)="modal.close()" title="Delete">
            <fa-icon [icon]="faTrashAlt"></fa-icon> Delete
          </button>
          <button class="btn btn-danger" (click)="modal.dismiss()" title="Cancel">
            <fa-icon [icon]="faBan"></fa-icon> Cancel
          </button>
        </div>
      </ng-template>
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
  closedResult = '';
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faBan = faBan;

  constructor(private store: Store<fromRoot.State>, private modal: NgbModal) {}

  ngOnInit() {
    this.store.dispatch(userActions.loadUsers());
    this.users$ = this.store.pipe(select(userSelectors.getUsers));
  }

  deleteUser(id, deleteModal) {
    this.modal.open(deleteModal).result.then(
      (result) => {
        this.closedResult = `Closed with ${result}`;
        this.store.dispatch(userActions.deleteUser({ id }));
      },
      (reason) => {
        this.closedResult = `Dismissed with ${reason}`;
      }
    );
  }
}

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminComponent } from './admin.component';
import { CanActivateAdmin } from '../auth/canActiveateAdmin.guard';
import { PathEditComponent } from './path-edit.component';
import { PathListComponent } from './path-list.component';
import { SourceEditComponent } from './source-edit.component';
import { SourceListComponent } from './source-list.component';
import { UserEditComponent } from './user-edit.component';
import { UserListComponent } from './user-list.component';
import { SharedModule } from '../shared/shared.module';

const routes = [
  {
    path: '',
    children: [
      { path: '', component: AdminComponent },
      { path: 'sources', component: SourceListComponent },
      { path: 'sources/:id', component: SourceEditComponent },
      { path: 'paths', component: PathListComponent },
      { path: 'paths/:id', component: PathEditComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/:id', component: UserEditComponent },
    ],
    canActivate: [CanActivateAdmin],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    PathEditComponent,
    PathListComponent,
    SourceEditComponent,
    SourceListComponent,
    UserEditComponent,
    UserListComponent,
  ],
  imports: [CommonModule, NgbModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}

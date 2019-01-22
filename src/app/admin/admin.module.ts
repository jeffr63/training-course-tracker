import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { PathListComponent } from './path-list/path-list.component';
import { PathEditComponent } from './path-edit/path-edit.component';
import { SourceListComponent } from './source-list/source-list.component';
import { SourceEditComponent } from './source-edit/source-edit.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CanActivateAdmin } from '../auth/canActiveateAdmin.guard';

const routes = [
  {
    path: 'admin', children: [
      { path: '', component: AdminComponent },
      { path: 'sources', component: SourceListComponent },
      { path: 'sources/:id', component: SourceEditComponent },
      { path: 'paths', component: PathListComponent },
      { path: 'paths/:id', component: PathEditComponent },
    ],
    canActivate: [CanActivateAdmin]
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    PathListComponent,
    PathEditComponent,
    SourceListComponent,
    SourceEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }

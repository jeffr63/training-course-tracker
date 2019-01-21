import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathListComponent } from './path-list/path-list.component';
import { PathEditComponent } from './path-edit/path-edit.component';
import { SourceListComponent } from './source-list/source-list.component';
import { SourceEditComponent } from './source-edit/source-edit.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'admin', children: [
      { path: '', component: AdminComponent },
      { path: 'sources', component: SourceListComponent },
      { path: 'sources/:id', component: SourceEditComponent },
      { path: 'paths', component: PathListComponent },
      { path: 'paths/:id', component: PathEditComponent },
    ]
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
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }

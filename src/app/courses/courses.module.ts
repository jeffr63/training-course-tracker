import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseListComponent } from './course-list/course-list.component';

const routes = [
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:id', component: CourseEditComponent }
];

@NgModule({
  declarations: [
    CourseEditComponent,
    CourseListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxLoadingModule,
    RouterModule.forChild(routes)
  ]
})
export class CoursesModule { }

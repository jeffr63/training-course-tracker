import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseEditComponent } from './course-edit/course-edit.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CourseListComponent,
    CourseDetailComponent,
    CourseEditComponent,
  ]
})
export class CoursesModule { }

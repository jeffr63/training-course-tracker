import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseListComponent } from './course-list/course-list.component';
import { reducer } from './state/course.reducer';
import { CourseEffects } from './state/course.effects';
import { CanActivateEdit } from '../auth/canActiveateEdit.guard';

const routes = [
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:id', component: CourseEditComponent, canActivate: [CanActivateEdit] }
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
    StoreModule.forFeature('courses', reducer),
    EffectsModule.forFeature([CourseEffects]),
    RouterModule.forChild(routes)
  ]
})
export class CoursesModule { }

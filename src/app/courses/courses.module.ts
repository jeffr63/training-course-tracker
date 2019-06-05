import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { CanActivateEdit } from '../auth/canActiveateEdit.guard';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseEffects } from './store/effects/course.effects';
import { CourseListComponent } from './course-list/course-list.component';
import { reducer } from './store/reducer/course.reducer';

const routes = [
  {
    path: '', children: [
      { path: '', component: CourseListComponent },
      { path: ':id', component: CourseEditComponent, canActivate: [CanActivateEdit] }
    ]
  }
];

@NgModule({
  declarations: [
    CourseEditComponent,
    CourseListComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    StoreModule.forFeature('courses', reducer),
    EffectsModule.forFeature([CourseEffects]),
    RouterModule.forChild(routes)
  ]
})
export class CoursesModule { }

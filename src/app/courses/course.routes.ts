import { Routes } from '@angular/router';
import { CanActivateEdit } from '../auth/canActiveateEdit.guard';
import { CourseTitleResolverService } from './services/course-title-resolver.service';

export const COURSE_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./components/course-list.component').then((m) => m.CourseListComponent),
      },
      {
        path: ':id',
        title: CourseTitleResolverService,
        loadComponent: () => import('./components/course-edit.component').then((m) => m.CourseEditComponent),
        canActivate: [CanActivateEdit],
      },
    ],
  },
];

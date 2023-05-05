import { inject } from '@angular/core';
import { Route } from '@angular/router';

import { AuthService } from '@auth/auth.service';
import { CourseTitleResolverService } from '@services/course-title-resolver.service';

export default [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('@courses/course-list.component'),
      },
      {
        path: ':id',
        title: CourseTitleResolverService,
        loadComponent: () => import('@app/courses/course-edit.component'),
        canActivate: [() => inject(AuthService).isLoggedIn()],
      },
    ],
  },
] as Route[];

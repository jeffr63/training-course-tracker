import { inject } from '@angular/core';
import { Route } from '@angular/router';

import { AuthService } from '@app/auth/auth.service';
import { CourseTitleResolverService } from '@courses/services/course-title-resolver.service';

export default [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('@courses/components/course-list.component'),
      },
      {
        path: ':id',
        title: CourseTitleResolverService,
        loadComponent: () => import('@courses/components/course-edit.component'),
        canActivate: [() => inject(AuthService).isLoggedIn()],
      },
    ],
  },
] as Route[];

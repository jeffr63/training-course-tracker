import { Route } from '@angular/router';

import { PathTitleResolverService } from '@admin/paths/services/path-title-resolver.service';
import { SourceTitleResolverService } from '@admin/sources/services/source-title-resolver.service';
import { UserTitleResolverService } from '@admin/users/services/user-title-resolver.service';
import { inject } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';

export default [
  {
    path: '',
    children: [
      { path: '', loadComponent: () => import('@admin/admin.component') },
      {
        path: 'sources',
        title: 'Sources',
        loadComponent: () => import('@admin/sources/components/source-list.component'),
      },
      {
        path: 'sources/:id',
        title: SourceTitleResolverService,
        loadComponent: () => import('@admin/sources/components/source-edit.component'),
      },
      {
        path: 'paths',
        title: 'Paths',
        loadComponent: () => import('@admin/paths/components/path-list.component'),
      },
      {
        path: 'paths/:id',
        title: PathTitleResolverService,
        loadComponent: () => import('@admin/paths/components/path-edit.component'),
      },
      {
        path: 'users',
        title: 'Users',
        loadComponent: () => import('@admin/users/components/user-list.component'),
      },
      {
        path: 'users/:id',
        title: UserTitleResolverService,
        loadComponent: () => import('@admin/users/components/user-edit.component'),
      },
    ],
    canActivate: [() => inject(AuthService).isLoggedInAsAdmin()],
  },
] as Route[];

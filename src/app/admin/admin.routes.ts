import { Route } from '@angular/router';
import { inject } from '@angular/core';

import { PathTitleResolverService } from '@services/path-title-resolver.service';
import { SourceTitleResolverService } from '@services/source-title-resolver.service';
import { UserTitleResolverService } from '@services/user-title-resolver.service';
import { AuthService } from '@auth/auth.service';

export default [
  {
    path: '',
    children: [
      { path: '', loadComponent: () => import('@admin/admin.component') },
      {
        path: 'sources',
        title: 'Sources',
        loadComponent: () => import('@admin/source-list.component'),
      },
      {
        path: 'sources/:id',
        title: SourceTitleResolverService,
        loadComponent: () => import('@app/admin/source-edit.component'),
      },
      {
        path: 'paths',
        title: 'Paths',
        loadComponent: () => import('@admin/path-list.component'),
      },
      {
        path: 'paths/:id',
        title: PathTitleResolverService,
        loadComponent: () => import('@admin/path-edit.component'),
      },
      {
        path: 'users',
        title: 'Users',
        loadComponent: () => import('@admin/user-list.component'),
      },
      {
        path: 'users/:id',
        title: UserTitleResolverService,
        loadComponent: () => import('@admin/user-edit.component'),
      },
    ],
    canActivate: [() => inject(AuthService).isLoggedInAsAdmin()],
  },
] as Route[];

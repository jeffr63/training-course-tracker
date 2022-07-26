import { Routes } from '@angular/router';

import { CanActivateAdmin } from '@auth/canActiveateAdmin.guard';
import { PathTitleResolverService } from '@admin/paths/services/path-title-resolver.service';
import { SourceTitleResolverService } from '@admin/sources/services/source-title-resolver.service';
import { UserTitleResolverService } from '@admin/users/services/user-title-resolver.service';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: '', loadComponent: () => import('@admin/admin.component').then((m) => m.AdminComponent) },
      {
        path: 'sources',
        title: 'Sources',
        loadComponent: () =>
          import('@admin/sources/components/source-list.component').then((m) => m.SourceListComponent),
      },
      {
        path: 'sources/:id',
        title: SourceTitleResolverService,
        loadComponent: () =>
          import('@admin/sources/components/source-edit.component').then((m) => m.SourceEditComponent),
      },
      {
        path: 'paths',
        title: 'Paths',
        loadComponent: () => import('@admin/paths/components/path-list.component').then((m) => m.PathListComponent),
      },
      {
        path: 'paths/:id',
        title: PathTitleResolverService,
        loadComponent: () => import('@admin/paths/components/path-edit.component').then((m) => m.PathEditComponent),
      },
      {
        path: 'users',
        title: 'Users',
        loadComponent: () => import('@admin/users/components/user-list.component').then((m) => m.UserListComponent),
      },
      {
        path: 'users/:id',
        title: UserTitleResolverService,
        loadComponent: () => import('@admin/users/components/user-edit.component').then((m) => m.UserEditComponent),
      },
    ],
    canActivate: [CanActivateAdmin],
  },
];

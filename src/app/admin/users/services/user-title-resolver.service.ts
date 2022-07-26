import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { UsersService } from '@admin/users/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserTitleResolverService implements Resolve<string> {
  constructor(private userService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string | Observable<string> | Promise<string> {
    const id = route.paramMap.get('id');
    if (id == 'new') {
      return 'New User';
    } else {
      return this.userService.get(+id).pipe(map((user) => user.name));
    }
  }
}

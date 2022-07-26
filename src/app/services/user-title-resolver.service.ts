import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';

import { UsersService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserTitleResolverService implements Resolve<string> {
  private sub = new Subscription();

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

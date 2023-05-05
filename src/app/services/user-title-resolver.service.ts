import { ActivatedRouteSnapshot } from '@angular/router';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { UsersService } from '@services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserTitleResolverService {
  userService = inject(UsersService);

  resolve(route: ActivatedRouteSnapshot): string | Observable<string> | Promise<string> {
    const id = route.paramMap.get('id');
    if (id == 'new') {
      return 'New User';
    } else {
      return this.userService.get(+id).pipe(map((user) => user.name));
    }
  }
}

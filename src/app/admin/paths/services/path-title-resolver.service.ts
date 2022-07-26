import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';

import { PathsService } from '@admin/paths/services/paths.service';

@Injectable({
  providedIn: 'root',
})
export class PathTitleResolverService implements Resolve<string> {
  private sub = new Subscription();

  constructor(private pathService: PathsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string | Observable<string> | Promise<string> {
    const id = route.paramMap.get('id');
    if (id == 'new') {
      return 'New Path';
    } else {
      return this.pathService.get(id).pipe(map((path) => path.name));
    }
  }
}

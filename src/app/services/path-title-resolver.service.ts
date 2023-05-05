import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';

import { PathsService } from '@services/paths.service';

@Injectable({
  providedIn: 'root',
})
export class PathTitleResolverService {
  pathService = inject(PathsService);

  resolve(route: ActivatedRouteSnapshot): string | Observable<string> | Promise<string> {
    const id = route.paramMap.get('id');
    if (id == 'new') {
      return 'New Path';
    } else {
      return this.pathService.get(id).pipe(map((path) => path.name));
    }
  }
}

import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';

import { SourcesService } from '@services/sources.service';

@Injectable({
  providedIn: 'root',
})
export class SourceTitleResolverService {
  sourceService = inject(SourcesService);

  resolve(route: ActivatedRouteSnapshot): string | Observable<string> | Promise<string> {
    const id = route.paramMap.get('id');
    if (id == 'new') {
      return 'New Source';
    } else {
      return this.sourceService.get(id).pipe(map((source) => source.name));
    }
  }
}

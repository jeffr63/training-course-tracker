import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';

import { CoursesService } from '@services/courses.service';

@Injectable({
  providedIn: 'root',
})
export class CourseTitleResolverService {
  courseService = inject(CoursesService);

  resolve(route: ActivatedRouteSnapshot): string | Observable<string> | Promise<string> {
    const id = route.paramMap.get('id');
    if (id == 'new') {
      return 'New Course';
    } else {
      return this.courseService.getCourse(id).pipe(map((course) => course.title));
    }
  }
}

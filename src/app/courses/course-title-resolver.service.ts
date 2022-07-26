import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';

import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root',
})
export class CourseTitleResolverService implements Resolve<string> {
  private sub = new Subscription();

  constructor(private courseService: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string | Observable<string> | Promise<string> {
    const id = route.paramMap.get('id');
    if (id == 'new') {
      return 'New Course';
    } else {
      return this.courseService.getCourse(id).pipe(map((course) => course.title));
    }
  }
}

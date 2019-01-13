import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';

import { Course } from '../course';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
  public course = <Course>{};
  public loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id !== 'new') {
        this.loading = true;
        this.coursesService.getCourse(params.id).subscribe(data => {
          this.course = data;
          this.loading = false;
        }, _error => {
          this.loading = false;
        });
      } else {
        const year = new Date().getFullYear();
        this.course.yearCompleted = year.toString();
      }
    });
  }

  pathSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(term => this.coursesService.searchPaths(term)),
      map(paths => _.map(paths, 'name'))
    )

  sourceSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(term => this.coursesService.searchSources(term)),
      map(sources => _.map(sources, 'name'))
    )

  save() {
    this.loading = true;
    this.coursesService.saveCourse(this.course).subscribe(data => {
      this.loading = false;
      this.router.navigate(['/courses']);
    }, _error => {
      this.loading = false;
    });

  }

}

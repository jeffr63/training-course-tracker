import { Component, OnInit } from '@angular/core';

import { Course } from '../course';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  public courses = <Course[]>[];
  public current = 1;
  public loading = false;
  public pageSize = 5;
  public totalCourses = 1;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.loading = true;
    this.refreshTable();
  }

  deleteCourse(id) {
    this.coursesService.deleteCourse(id).subscribe(data => this.refreshTable());
  }

  refreshTable() {
    this.coursesService.getCoursesUnsorted().subscribe((data => {
      this.totalCourses = data.length;
    }));

    this.coursesService.getCoursesPaged(this.current, this.pageSize).subscribe(data => {
      this.courses = data;
      this.loading = false;
    }, _error => {
      this.loading = false;
    });
  }

}

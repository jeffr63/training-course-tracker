import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '@store/index';
import * as fromCourseSelector from '@store/course/course.selectors';
import * as courseActions from '@store/course/course.actions';
import { AuthService } from '@auth/auth.service';
import { Course } from '@courses/models/course';
import { DeleteComponent } from '@shared/modals/delete.component';
import { ListDisplayComponent } from '@shared/list/list-display.component';
import { ModalDataService } from '@shared/modals/modal-data.service';
import { PagerListHeaderComponent } from '@shared/list/pager-list-header.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, NgbModule, PagerListHeaderComponent, ListDisplayComponent],

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Training Courses</h1>
        </header>

        <section class="card-body">
          <app-pager-list-header
            includePager="true"
            [total]="totalCourses$ | async"
            [pageSize]="pageSize"
            [maxSize]="5"
            [(current)]="current"
            [isAuthenticated]="authService.isAuthenticated"
            (refreshTable)="refreshTable()"
            (newCourse)="newCourse()"
          ></app-pager-list-header>

          <app-list-display
            [headers]="headers"
            [columns]="columns"
            [items]="courses$ | async"
            [isAuthenticated]="authService.isAuthenticated"
            (deleteItem)="deleteCourse($event)"
            (editItem)="editCourse($event)"
          ></app-list-display>
        </section>
      </section>
    </section>
  `,

  styles: [],
})
export class CourseListComponent implements OnInit {
  courses$: Observable<Course[]>;
  selectCourse = <Course>{};
  current = 1;
  loading = false;
  pageSize = 10;
  totalCourses$: Observable<number>;
  closedResult = '';
  columns = ['title', 'instructor', 'path', 'source'];
  headers = ['Title', 'Instructor', 'Path', 'Source'];

  constructor(
    private store: Store<fromRoot.State>,
    private modal: NgbModal,
    public authService: AuthService,
    private modalDataService: ModalDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(
      courseActions.loadCourses({
        current: this.current,
        pageSize: this.pageSize,
      })
    );
    this.store.dispatch(courseActions.getTotalCourses());
    this.courses$ = this.store.pipe(select(fromCourseSelector.getCourses));
    this.totalCourses$ = this.store.pipe(select(fromCourseSelector.getTotalCourses));
  }

  deleteCourse(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this course?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((_result) => {
      this.store.dispatch(
        courseActions.deleteCourse({
          id: id,
          current: this.current,
          pageSize: this.pageSize,
        })
      );
    });
  }

  editCourse(id) {
    this.router.navigate(['/courses', id]);
  }

  newCourse() {
    this.router.navigate(['/courses/new']);
  }

  refreshTable() {
    this.store.dispatch(
      courseActions.loadCourses({
        current: this.current,
        pageSize: this.pageSize,
      })
    );
  }
}

import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '@store/index';
import { AuthService } from '@services/auth/auth.service';
import { Course } from '@models/course';
import { coursesActions } from '@store/course/course.actions';
import { coursesFeature } from '@store/course/course.state';
import { DeleteComponent } from '@modals/delete.component';
import { ListDisplayComponent } from '@shared/components/list-display.component';
import { ModalDataService } from '@modals/modal-data.service';
import { PagerListHeaderComponent } from '@shared/components/pager-list-header.component';

@Component({
  selector: 'app-course-list',
  imports: [AsyncPipe, NgbModule, PagerListHeaderComponent, ListDisplayComponent],
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
            [isAuthenticated]="isLoggedIn()"
            (refreshTable)="refreshTable()"
            (newCourse)="newCourse()"></app-pager-list-header>

          <app-list-display
            [headers]="headers"
            [columns]="columns"
            [items]="courses$ | async"
            [isAuthenticated]="isLoggedIn()"
            (deleteItem)="deleteCourse($event)"
            (editItem)="editCourse($event)"></app-list-display>
        </section>
      </section>
    </section>
  `,
  styles: [],
})
export default class CourseListComponent implements OnInit {
  readonly #store = inject(Store<fromRoot.State>);
  readonly #modal = inject(NgbModal);
  readonly #authService = inject(AuthService);
  readonly #modalDataService = inject(ModalDataService);
  readonly #router = inject(Router);

  protected courses$: Observable<Course[]>;
  protected current = 1;
  protected readonly pageSize = 10;
  protected totalCourses$: Observable<number>;
  protected readonly closedResult = '';
  protected readonly columns = ['title', 'instructor', 'path', 'source'];
  protected readonly headers = ['Title', 'Instructor', 'Path', 'Source'];

  protected readonly isLoggedIn = this.#authService.isLoggedIn;

  ngOnInit() {
    this.#store.dispatch(
      coursesActions.loadCourses({
        current: this.current,
        pageSize: this.pageSize,
      })
    );
    this.#store.dispatch(coursesActions.getTotalCourses());
    this.courses$ = this.#store.pipe(select(coursesFeature.selectCourses));
    this.totalCourses$ = this.#store.pipe(select(coursesFeature.selectTotalCourses));
  }

  deleteCourse(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this course?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.#modalDataService.setDeleteModalOptions(modalOptions);
    this.#modal.open(DeleteComponent).result.then((_result) => {
      this.#store.dispatch(
        coursesActions.deleteCourse({
          id: id,
          current: this.current,
          pageSize: this.pageSize,
        })
      );
    });
  }

  editCourse(id) {
    this.#router.navigate(['/courses', id]);
  }

  newCourse() {
    this.#router.navigate(['/courses/new']);
  }

  refreshTable() {
    this.#store.dispatch(
      coursesActions.loadCourses({
        current: this.current,
        pageSize: this.pageSize,
      })
    );
  }
}

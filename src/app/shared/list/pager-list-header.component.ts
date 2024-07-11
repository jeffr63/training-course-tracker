import { Component, computed, Input, input, model, output } from '@angular/core';

import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pager-list-header',
  standalone: true,
  imports: [NgbModule, NgbPaginationModule],

  template: `
    <header class="row">
      <div class="col">
        <ngb-pagination
          [collectionSize]="total()"
          [boundaryLinks]="true"
          [pageSize]="pageSize()"
          [maxSize]="maxSize()"
          [rotate]="true"
          [(page)]="current"
          (pageChange)="onPageChange()"></ngb-pagination>
      </div>
      @if (isAuthenticated()) {
      <div class="col">
        <button class="btn btn-sm" (click)="newClicked()" title="Add">
          <i class="bi bi-plus-circle-fill display-6 text-success"></i>
        </button>
      </div>
      }
    </header>
  `,

  styles: [],
})
export class PagerListHeaderComponent {
  public readonly current = model<number>(1);
  public readonly isAuthenticated = input<boolean>(false);
  public readonly maxSize = input<number>(5);
  public readonly pageSize = input<number>(10);
  public readonly total = input<number>(0);
  protected readonly newCourse = output();
  protected readonly refreshTable = output();

  onPageChange() {
    this.refreshTable.emit();
  }

  newClicked() {
    this.newCourse.emit();
  }
}

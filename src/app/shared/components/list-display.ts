import { Component, input, output } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-display',
  imports: [NgbModule],
  template: `
    <table class="table table-striped">
      <thead>
        @for (header of headers(); track header) {
        <th>{{ header }}</th>
        }
        <th>&nbsp;</th>
      </thead>
      <tbody>
        @for (item of items(); track $index) {
        <tr>
          @for (column of columns(); track $index) {
          <td>{{ item[column] }}</td>
          }
          <!-- action buttons -->
          @if (isAuthenticated()) {
          <td>
            <button class="btn btn-info btn-sm me-2" (click)="editClicked(item.id)" title="Edit">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button class="btn btn-danger btn-sm" (click)="deleteClicked(item.id)" title="Delete">
              <i class="bi bi-trash3-fill"></i>
            </button>
          </td>
          }
        </tr>
        }
      </tbody>
    </table>
  `,
})
export class ListDisplay {
  public readonly columns = input.required<string[]>();
  public readonly headers = input.required<string[]>();
  public readonly items = input.required<any[]>();
  public readonly isAuthenticated = input.required<boolean>();
  protected readonly deleteItem = output<number>();
  protected readonly editItem = output<number>();

  editClicked(id: number) {
    this.editItem.emit(id);
  }

  deleteClicked(id: number) {
    this.deleteItem.emit(id);
  }
}

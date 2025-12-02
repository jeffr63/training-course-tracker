import { Component, input } from '@angular/core';
import { CourseData } from '@models/course-interface';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChartCard } from '@shared/components/chart-card';

@Component({
  selector: 'app-dashboard-content',
  imports: [NgbModule, ChartCard],
  template: `
    <section>
      <div class="container-fluid">
        <div class="row first-row">
          <div class="col-xm-12 col-sm-6">
            <app-chart-card title="Completed Courses - Paths" [data]="paths()" />
          </div>

          <div class="col-xm-12 col-sm-6">
            <app-chart-card title="Completed Courses - Sources" [data]="sources()" />
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class DashboardContent {
  paths = input.required<CourseData[]>();
  sources = input.required<CourseData[]>();
}

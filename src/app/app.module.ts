import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// third party modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';

// custom components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoursesModule } from './courses/courses.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    CoursesModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

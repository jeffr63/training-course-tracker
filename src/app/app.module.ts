import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// third party modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// custom components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoursesModule } from './courses/courses.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    CoursesModule,
    EffectsModule.forRoot([]),
    HttpClientModule,
    NgbModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 5, logOnly: environment.production }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

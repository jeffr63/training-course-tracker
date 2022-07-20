import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// third party modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// custom components
import { AppComponent } from './app.component';
import { AppEffects } from './store/app.effects';
import { AppRoutingModule } from './app-routing.module';
import { CourseEffects } from './store/course/course.effects';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteComponent } from './modals/delete.component';
import { environment } from '../environments/environment.prod';
import { LoginComponent } from './modals/login.component';
import { MenuComponent } from './menu/menu.component';
import { PathsEffects } from './store/paths/paths.effects';
import { reducers, metaReducers } from './store';
import { SharedModule } from './shared/shared.module';
import { SourcesEffects } from './store/sources/sources.effects';
import { UsersEffects } from './store/users/users.effects';

@NgModule({
  declarations: [AppComponent, DashboardComponent, DeleteComponent, LoginComponent, MenuComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    NgxChartsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects, CourseEffects, PathsEffects, SourcesEffects, UsersEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 5,
      logOnly: environment.production,
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

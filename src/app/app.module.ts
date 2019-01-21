import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// third party modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// custom components
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoursesModule } from './courses/courses.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.prod';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects/app.effects';
import { PathsEffects } from './store/effects/paths.effects';
import { SourcesEffects } from './store/effects/sources.effects';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent
  ],
  imports: [
    AdminModule,
    BrowserModule,
    CoursesModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 5, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects, PathsEffects, SourcesEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

// third party modules
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NgxChartsModule } from "@swimlane/ngx-charts";

// custom components
import { AppComponent } from "./app.component";
import { AppEffects } from "./store/effects/app.effects";
import { AppRoutingModule } from "./app-routing.module";
import { CallbackComponent } from "./callback.component";
import { CourseEffects } from "./store/effects/course.effects";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { environment } from "../environments/environment.prod";
import { MenuComponent } from "./menu/menu.component";
import { PathsEffects } from "./store/effects/paths.effects";
import { reducers, metaReducers } from "./store/reducers";
import { SourcesEffects } from "./store/effects/sources.effects";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule,
    NgxChartsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 5,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      AppEffects,
      CourseEffects,
      PathsEffects,
      SourcesEffects,
    ]),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';
import { RouterModule, TitleStrategy } from '@angular/router';
import { CustomTitleStrategyService } from './app/services/custom-title-strategy.service';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './app/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppEffects } from './app/store/app.effects';
import { CourseEffects } from './app/store/course/course.effects';
import { PathsEffects } from './app/store/paths/paths.effects';
import { SourcesEffects } from './app/store/sources/sources.effects';
import { UsersEffects } from './app/store/users/users.effects';
import { APP_ROUTES } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      StoreModule.forRoot(reducers, { metaReducers }),
      EffectsModule.forRoot([AppEffects, CourseEffects, PathsEffects, SourcesEffects, UsersEffects]),
      StoreDevtoolsModule.instrument({
        maxAge: 5,
        logOnly: environment.production,
      }),
      RouterModule.forRoot(APP_ROUTES, { relativeLinkResolution: 'legacy' })
    ),
    { provide: TitleStrategy, useClass: CustomTitleStrategyService },
  ],
}).catch((err) => console.error(err));

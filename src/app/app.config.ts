import { ApplicationConfig } from '@angular/core';
import { environment } from '@env/environment';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { TitleStrategy, provideRouter } from '@angular/router';

import { metaReducers, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { APP_ROUTES } from './app.routes';
import { AppEffects } from '@store/app.effects';
import { CustomTitleStrategyService } from '@services/custom-title-strategy.service';
import { CourseEffects } from '@store/course/course.effects';
import { PathsEffects } from '@store/paths/paths.effects';
import { SourcesEffects } from '@store/sources/sources.effects';
import { UsersEffects } from '@store/users/users.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      StoreModule.forRoot(reducers, { metaReducers }),
      EffectsModule.forRoot([AppEffects, CourseEffects, PathsEffects, SourcesEffects, UsersEffects]),
      StoreDevtoolsModule.instrument({
        maxAge: 5,
        logOnly: environment.production,
      })
    ),
    { provide: TitleStrategy, useClass: CustomTitleStrategyService },
    provideAnimations(),
    provideHttpClient(),
    provideRouter(APP_ROUTES),
  ],
};

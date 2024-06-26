import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { TitleStrategy, provideRouter, withComponentInputBinding } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { APP_ROUTES } from './app.routes';
import { CustomTitleStrategyService } from '@resolvers/custom-title-strategy.service';
import { courseEffects } from '@store/course/course.effects';
import { coursesFeature } from '@store/course/course.state';
import { pathsEffects } from '@store/paths/paths.effects';
import { pathsFeature } from '@store/paths/paths.state';
import { sourcesEffects } from '@store/sources/sources.effects';
import { sourcesFeature } from '@store/sources/sources.state';
import { usersEffects } from '@store/users/users.effects';
import { usersFeature } from '@store/users/users.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: TitleStrategy, useClass: CustomTitleStrategyService },
    provideAnimations(),
    provideHttpClient(),
    provideStore(),
    provideState(coursesFeature),
    provideState(pathsFeature),
    provideState(sourcesFeature),
    provideState(usersFeature),
    provideEffects([courseEffects, pathsEffects, sourcesEffects, usersEffects]),
    provideStoreDevtools({
      maxAge: 5,
      logOnly: !isDevMode(),
    }),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
  ],
};

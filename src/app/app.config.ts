import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { TitleStrategy, provideRouter, withComponentInputBinding } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { APP_ROUTES } from './app.routes';
import { CustomTitleStrategy } from '@shared/services/common/custom-title-strategy';
import { courseEffects } from '@store/course/course.effects';
import { coursesFeature } from '@store/course/course.state';
import { pathsEffects } from '@store/path/paths.effects';
import { pathsFeature } from '@store/path/paths.state';
import { sourcesEffects } from '@store/source/sources.effects';
import { sourcesFeature } from '@store/source/sources.state';
import { usersEffects } from '@store/user/users.effects';
import { usersFeature } from '@store/user/users.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
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

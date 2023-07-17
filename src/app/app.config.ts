import { ApplicationConfig } from '@angular/core';
import { environment } from '../environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { TitleStrategy, provideRouter, withComponentInputBinding } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { APP_ROUTES } from './app.routes';
import { AppEffects } from '@store/app.effects';
import { CustomTitleStrategyService } from '@resolvers/custom-title-strategy.service';
import { CourseEffects } from '@store/course/course.effects';
import { PathsEffects } from '@store/paths/paths.effects';
import { SourcesEffects } from '@store/sources/sources.effects';
import { UsersEffects } from '@store/users/users.effects';
import { coursesFeature } from '@store/course/course.state';
import { pathsFeature } from '@store/paths/paths.state';
import { sourcesFeature } from '@store/sources/sources.state';
import { usersFeature } from '@store/users/users.state';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: TitleStrategy, useClass: CustomTitleStrategyService },
    provideAnimations(),
    provideHttpClient(),
    provideStore(),
    provideState(coursesFeature),
    provideState(pathsFeature),
    provideState(sourcesFeature),
    provideState(usersFeature),
    provideEffects([AppEffects, CourseEffects, PathsEffects, SourcesEffects, UsersEffects]),
    provideStoreDevtools({
      maxAge: 5,
      logOnly: environment.production,
    }),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
  ],
};

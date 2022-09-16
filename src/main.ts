import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter, TitleStrategy } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { metaReducers, reducers } from '@store/index';
import { environment } from '@env/environment';
import { APP_ROUTES } from '@app/app.routes';
import { AppComponent } from '@app/app.component';
import { AppEffects } from '@store/app.effects';
import { CourseEffects } from '@store/course/course.effects';
import { CustomTitleStrategyService } from '@shared/services/custom-title-strategy.service';
import { PathsEffects } from '@store/paths/paths.effects';
import { SourcesEffects } from '@store/sources/sources.effects';
import { UsersEffects } from '@store/users/users.effects';

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
      ),
      { provide: TitleStrategy, useClass: CustomTitleStrategyService },
      provideRouter(APP_ROUTES)
  ],
}).catch((err) => console.error(err));

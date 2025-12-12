import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromRoot from '@store/index';
import { pathsActions } from '@store/path/paths.actions';
import { sourcesActions } from '@store/source/sources.actions';
import { AuthService } from '@shared/services/auth/auth-service';
import { Menu } from './menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [Menu, RouterOutlet],
  template: `
    <app-menu></app-menu>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
})
export class App implements OnInit {
  readonly #authService = inject(AuthService);
  readonly #store = inject(Store<fromRoot.State>);

  ngOnInit() {
    this.#store.dispatch(pathsActions.loadPaths());
    this.#store.dispatch(sourcesActions.loadSources());
    this.#authService.checkLogin();
  }
}

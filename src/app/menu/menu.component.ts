import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '@shared/services/auth/auth-service';
import { LoginModal } from '@modals/login-modal';
import { MenuToolbar } from './menu-toolbar';

@Component({
  selector: 'app-menu',
  imports: [MenuToolbar],
  template: `<app-menu-toolbar
    [isAdmin]="isAdmin()"
    [isLoggedIn]="isLoggedIn()"
    [isNavbarCollapsed]="isNavbarCollapsed()"
    (login)="login()"
    (logout)="logout()"
    (toggleNavigation)="toggleNavigation()" />`,
})
export class Menu {
  readonly #auth = inject(AuthService);
  readonly #modalService = inject(NgbModal);
  readonly #router = inject(Router);

  protected readonly isNavbarCollapsed = signal(false);
  protected readonly isLoggedIn = this.#auth.isLoggedIn;
  protected readonly isAdmin = this.#auth.isLoggedInAsAdmin;

  login() {
    this.#modalService.open(LoginModal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result) {
        this.#auth.login(result.email, result.password).subscribe();
      }
    });
  }

  logout() {
    this.#auth.logout();
    this.#router.navigate(['/']);
  }

  toggleNavigation(): void {
    this.isNavbarCollapsed.set(!this.isNavbarCollapsed());
  }
}

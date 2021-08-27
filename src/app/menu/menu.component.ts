import { Component } from '@angular/core';

import { Auth0Service } from '../auth/auth.service';

@Component({
  selector: 'app-menu',

  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" [routerLink]="['/']">Training Courses Tracker</a>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
        (click)="isNavbarCollapsed = !isNavbarCollapsed"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div (ngbCollapse)="(isNavbarCollapsed)" class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <a class="nav-item nav-link active" [routerLink]="['/']">Home <span class="sr-only">(current)</span></a>
          <a class="nav-item nav-link" [routerLink]="['/courses']">Courses</a>
          <div *ngIf="auth.isAuthenticated === false" class="nav-item nav-link" (click)="auth.login()">Login</div>
          <a *ngIf="auth.isAuthenticated && auth.isAdmin" class="nav-item nav-link" [routerLink]="['/admin']">Admin</a>
          <div *ngIf="auth.isAuthenticated" class="nav-item nav-link" (click)="auth.logout()">Logout</div>
        </div>
      </div>
    </nav>
  `,

  styles: [
    `
      div .nav-item {
        cursor: pointer;
      }
    `,
  ],
})
export class MenuComponent {
  public isNavbarCollapsed = true;

  constructor(public auth: Auth0Service) {}
}

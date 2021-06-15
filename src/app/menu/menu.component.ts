import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-menu",

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

      <div
        (ngbCollapse)="(isNavbarCollapsed)"
        class="collapse navbar-collapse"
        id="navbarNavAltMarkup"
      >
        <div class="navbar-nav ml-auto">
          <a class="nav-item nav-link active" [routerLink]="['/']"
            >Home <span class="sr-only">(current)</span></a
          >
          <a class="nav-item nav-link" [routerLink]="['/courses']">Courses</a>
          <!--<a *ngIf="!auth.isLoggedIn" class="nav-item nav-link" href="#" (click)="auth.login()">Login</a>
       <a *ngIf="auth.isLoggedIn && auth.isAdmin" class="nav-item nav-link" [routerLink]="['/admin']">Admin</a>
      <a *ngIf="auth.isLoggedIn" class="nav-item nav-link" href="#" (click)="auth.logout()">Logout</a> -->
          <div
            *ngIf="!auth.isAuthenticated()"
            class="nav-item nav-link"
            (click)="auth.login()"
          >
            Login
          </div>
          <a
            *ngIf="auth.isAuthenticated() && auth.isAdmin"
            class="nav-item nav-link"
            [routerLink]="['/admin']"
            >Admin</a
          >
          <div
            *ngIf="auth.isAuthenticated()"
            class="nav-item nav-link"
            (click)="auth.logout()"
          >
            Logout
          </div>
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

  constructor(public auth: AuthService) {}
}

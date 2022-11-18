import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '@auth/auth.service';
import { LoginComponent } from '@shared/modals/login.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgIf, NgbModule, RouterLink],

  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" [routerLink]="['/']" id="brand">Training Courses Tracker</a>

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
        <div class="navbar-nav ms-auto">
          <a class="nav-item nav-link active" [routerLink]="['/']" id="home">Home</a>
          <a class="nav-item nav-link" [routerLink]="['/courses']" id="courses">Courses</a>
          <a class="nav-item nav-link" *ngIf="auth.isAuthenticated === false" (click)="open()" id="login">Login</a>
          <a class="nav-item nav-link" [routerLink]="['/admin']" *ngIf="auth.isAuthenticated && auth.isAdmin" id="admin"
            >Admin</a
          >
          <a class="nav-item nav-link" *ngIf="auth.isAuthenticated" (click)="logout()" id="logout">Logout</a>
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

  constructor(public auth: AuthService, private modalService: NgbModal, private router: Router) {}

  open() {
    this.modalService.open(LoginComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result) {
        this.auth.login(result.email, result.password).subscribe();
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}

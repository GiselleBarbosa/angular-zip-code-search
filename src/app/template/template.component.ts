import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-template',

  styles: [
    `
      .sidenav-container {
        height: 100%;
      }

      .sidenav {
        width: 200px;
      }

      .sidenav .mat-toolbar {
        background: inherit;
      }

      .mat-toolbar.mat-primary {
        position: sticky;
        top: 0;
        z-index: 1;
      }

      .cursor-pointer {
        cursor: pointer;
      }
    `,
  ],
  template: `<mat-sidenav-container class="sidenav-container">
    <mat-sidenav
      #drawer
      class="sidenav"
      fixedInViewport
      [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
      [mode]="(isHandset$ | async) ? 'over' : 'side'"
      [opened]="(isHandset$ | async) === false"
    >
      <mat-toolbar class="cursor-pointer"> Options </mat-toolbar>
      <mat-nav-list>
        <a mat-list-item href="#">Next feature</a>
        <a mat-list-item href="#">Next feature ...</a>
      </mat-nav-list>
    </mat-sidenav>
    <mat-sidenav-content>
      <mat-toolbar color="primary">
        <button
          type="button"
          aria-label="Toggle sidenav"
          mat-icon-button
          (click)="drawer.toggle()"
          *ngIf="isHandset$ | async"
        >
          <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
        </button>
        <span class="cursor-pointer" routerLink="/">Zip Code Search</span>
      </mat-toolbar>
      <router-outlet />
    </mat-sidenav-content>
  </mat-sidenav-container> `,
})
export class TemplateComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}

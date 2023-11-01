import { AsyncPipe, NgIf } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';

import { FooterComponent } from '../home/layout/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
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
  template: `
  <mat-sidenav-container class="sidenav-container">
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
        <div class="ps-4 pt-4">
          <h3>Find your address</h3>
        </div>
        <div class="ps-4 pe-4 mb-5">
          <router-outlet />
        </div>
        <app-footer />
      </mat-sidenav-content>
    </mat-sidenav-container>
    `,
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    AsyncPipe,
    FooterComponent,
  ],
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

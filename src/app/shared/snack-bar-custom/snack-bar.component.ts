import { Component, Inject, inject } from '@angular/core';
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule, MatIconModule],
  styles: [
    `
      :host {
        display: flex;
      }

      .action {
        color: hotpink;
      }
    `,
  ],
  template: `
    <span matSnackBarLabel>
      {{ data }}
    </span>
    <span matSnackBarActions>
      <button
        mat-button
        matSnackBarAction
        (click)="snackBarRef.dismissWithAction()"
      >
        <span matSnackBarLabel
          ><mat-icon class="action" fontIcon="close"></mat-icon
        ></span>
      </button>
    </span>
  `,
})
export class SnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}

  public snackBarRef = inject(MatSnackBarRef);
}

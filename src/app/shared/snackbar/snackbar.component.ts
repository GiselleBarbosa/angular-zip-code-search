import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field>
      <mat-label>Saved successfully</mat-label>
      <input matInput value="Saved successfully!" #message />
    </mat-form-field>

    <mat-form-field>
      <mat-label>Close</mat-label>
      <input matInput value="Close" #action />
    </mat-form-field>
  `,
})
export class SnackbarComponent {}

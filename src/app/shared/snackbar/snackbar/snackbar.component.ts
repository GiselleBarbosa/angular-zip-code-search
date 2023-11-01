import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  template: ` 
  <mat-form-field>
      <mat-label>Message</mat-label>
      <input matInput value="Disco party!" #message />
    </mat-form-field>

    <mat-form-field>
      <mat-label>Action</mat-label>
      <input matInput value="Dance" #action />
    </mat-form-field>`,
})
export class SnackbarComponent {}

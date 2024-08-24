import { Component, Inject, inject } from '@angular/core';
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule, MatIconModule],
  templateUrl: "./snack-bar.component.html",
  styleUrls: ["./snack-bar.component.scss"]
})
export class SnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}

  public snackBarRef = inject(MatSnackBarRef);
}

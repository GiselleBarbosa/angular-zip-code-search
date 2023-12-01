import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatInputModule, MatIconModule, MatButtonModule, MatSnackBarModule],
  exports: [MatInputModule, MatIconModule, MatButtonModule, MatSnackBarModule],
})/*  */
export class AngularMaterialImportsModule {}

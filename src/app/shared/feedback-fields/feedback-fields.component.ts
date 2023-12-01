import { Component, Input } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-feedback-fields',
  template: `
    <ng-container *transloco="let transloco">
      <ng-container *ngIf="hasTouched()">
        <mat-error class="mb-3" *ngIf="form.get(field)?.hasError('required')">
          {{ transloco('home-page.invalid-feedback.required') }}
        </mat-error>
        <mat-error class="mb-3" *ngIf="form.get(field)?.hasError('maxlength')">
          {{ transloco('home-page.invalid-feedback.max') }}
          {{ maxLength }}
        </mat-error>
        <mat-error class="mb-3" *ngIf="form.get(field)?.hasError('minlength')">
          {{ transloco('home-page.invalid-feedback.min') }}
          {{ minLength }}
        </mat-error>
        <mat-error class="mb-3" *ngIf="form.get(field)?.hasError('pattern')">
          {{ transloco('home-page.invalid-feedback.invalid-pattern') }}
        </mat-error>
      </ng-container></ng-container
    >
  `,
  standalone: true,
  imports: [NgIf, MatFormFieldModule, TranslocoModule],
})
export class FeedbackFieldsComponent {
  @Input() public form!: FormGroup;
  @Input() public field!: string;

  @Input() public minLength!: number;
  @Input() public maxLength!: number;
  @Input() public required!: string;
  @Input() public pattern!: string;

  public hasTouched(): boolean {
    const touchedField = this.form.get(this.field);

    return touchedField &&
      touchedField.invalid &&
      (touchedField.dirty || touchedField.touched)
      ? true
      : false;
  }
}

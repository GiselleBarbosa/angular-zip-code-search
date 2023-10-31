import { Component, Input } from '@angular/core';

import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-feedback-fields',
  template: `
    <ng-container *ngIf="hasTouched()">
      <mat-error class="mb-3" *ngIf="form.get(field)?.hasError('required')">
        Required field
      </mat-error>
      <mat-error class="mb-3" *ngIf="form.get(field)?.hasError('maxlength')">
        Max length characters is {{ maxLength }}
      </mat-error>
      <mat-error class="mb-3" *ngIf="form.get(field)?.hasError('minlength')">
        Min length characters is {{ minLength }}
      </mat-error>
      <mat-error class="mb-3" *ngIf="form.get(field)?.hasError('pattern')">
        invalid character for this field
      </mat-error>
    </ng-container>
  `,
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

import { Component, Input } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-feedback-fields',
  templateUrl: "./feedback-fields.component.html" ,
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

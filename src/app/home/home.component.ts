import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { FindAddressService } from './services/find-address.service';
import { regex } from './regex/regex';
import { take } from 'rxjs';
import { FeedbackFieldsComponent } from '../shared/feedback-fields/feedback-fields.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-home',
    styles: [
        `
      .form {
        min-width: 150px;
        max-width: 400px;
        width: 100%;
      }

      .full-width-field {
        width: 100%;
      }

      .small-field {
        width: 50%;
      }
    `,
    ],
    templateUrl: 'home.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FeedbackFieldsComponent,
    ],
})
export class HomeComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _findAdressService: FindAddressService
  ) {}

  public form!: FormGroup;

  public ngOnInit(): void {
    this.setDataForm();

    const savedForm = localStorage.getItem('saved_address');

    if (savedForm) {
      console.log(savedForm);
      this.form.patchValue(JSON.parse(savedForm));
    }
  }

  public setDataForm(): void {
    this.form = this._fb.group({
      zipcode: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(9),
          Validators.minLength(9),
          Validators.pattern(regex.zipcodePattern),
        ]),
      ],
      address: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
          Validators.pattern(regex.alphabeticPattern),
        ]),
      ],
      number: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(1),
          Validators.pattern(regex.numericPattern),
        ]),
      ],
      complement: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(35),
          Validators.minLength(1),
        ]),
      ],
      reference: [
        '',
        Validators.compose([Validators.maxLength(40), Validators.minLength(1)]),
      ],
      neighborhood: [
        '',
        Validators.compose([Validators.maxLength(40), Validators.minLength(3)]),
      ],
      city: [
        '',
        Validators.compose([Validators.maxLength(40), Validators.minLength(3)]),
      ],
      uf: [
        '',
        Validators.compose([Validators.maxLength(2), Validators.minLength(2)]),
      ],
      country: [
        '',
        Validators.compose([Validators.maxLength(40), Validators.minLength(3)]),
      ],
    });
  }

  public PopulateFields(): void {
    const zipcode = this.form.get('zipcode')?.value;

    if ((zipcode && zipcode.length === 8) || 9) {
      this._findAdressService
        .findAddress(zipcode)
        .pipe(take(1))
        .subscribe((apiAddressData) => {
          this.form.patchValue({
            address: apiAddressData.logradouro,
            neighborhood: apiAddressData.bairro,
            city: apiAddressData.localidade,
            uf: apiAddressData.uf,
            country: 'Brasil',
          });
          const dataForm = this.form.getRawValue();

          localStorage.setItem('saved_address', JSON.stringify(dataForm));
        });
    } else {
      alert('Invalid zip code');
    }
  }

  public submitForm() {
    this.form.markAllAsTouched();
    const dataForm = this.form.getRawValue();

    if (this.form.valid) {
      console.log('Form sent successfully!');
      localStorage.setItem('saved_address', JSON.stringify(dataForm));
    } else {
      console.log('Invalid fields');
    }
  }

  public resetForm(): void {
    this.form.reset();
    localStorage.removeItem('saved_address');
  }
}

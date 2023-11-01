import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FeedbackFieldsComponent } from '../shared/feedback-fields/feedback-fields.component';
import { FindAddressService } from './services/find-address.service';
import { MaterialImportsModule } from '../shared/material-imports/material-imports/material-imports.module';
import { ZipcodeMaskService } from './services/zipcode-mask.service';
import { regex } from './regex/regex';
import { take } from 'rxjs';

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
    FeedbackFieldsComponent,
    MaterialImportsModule,
    ReactiveFormsModule,
  ],
})
export class HomeComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _findAdressService: FindAddressService,
    private _zipcodeMaskService: ZipcodeMaskService
  ) {}

  public form!: FormGroup;

  public ngOnInit(): void {
    this.setDataForm();

    const savedForm = localStorage.getItem('saved_address');

    if (savedForm) {
      this.form.patchValue(JSON.parse(savedForm));
    }

    this.form.valueChanges.subscribe((modifiedFieldsData) => {
      localStorage.setItem('saved_address', JSON.stringify(modifiedFieldsData));
    });
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
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.minLength(3),
        ]),
      ],
      city: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.minLength(3),
        ]),
      ],
      uf: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(2),
          Validators.minLength(2),
        ]),
      ],
      country: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.minLength(3),
        ]),
      ],
    });
  }

  public PopulateFields(): void {
    const zipcode = this.form.get('zipcode')?.value;

    if (zipcode && zipcode.length === 9) {
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

          // localStorage.setItem('saved_address', JSON.stringify(dataForm));
        });
    } else {
      alert('Invalid zip code. Accepted format Ex. 01310-930');
    }
  }

  public submitForm() {
    this.form.markAllAsTouched();
    const dataForm = this.form.getRawValue();

    if (this.form.valid) {
      console.log('Form sent successfully!');
      this.resetForm();
    } else {
      localStorage.setItem('saved_address', JSON.stringify(dataForm));
      console.log('Invalid fields');
    }
  }

  public resetForm(): void {
    this.form.reset();

    localStorage.removeItem('saved_address');
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  public zipCodePatterMask(event: KeyboardEvent): void {
    this._zipcodeMaskService.zipCodePatterMask(event);
  }
}

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription, take } from 'rxjs';

import { AngularMaterialImportsModule } from 'src/app/shared/angular-material-imports/angular-material-imports/angular-material-imports.module';
import { FeedbackFieldsComponent } from '../../../shared/feedback-fields/feedback-fields.component';
import { FindAddressService } from '../services/find-address.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/snack-bar-custom/snack-bar.component';
import { regex } from '../../../shared/regex/regex';

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
    ReactiveFormsModule,
    AngularMaterialImportsModule,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  private _findAdressService = inject(FindAddressService);
  private _snackBar = inject(MatSnackBar);
  private _fb = inject(FormBuilder);

  private zipcodeSubscription!: Subscription;

  private zipcodeValue!: string;

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

    this.zipcodeSubscription = this.form
      .get('zipcode')!
      .valueChanges.subscribe((zipcode: string) => {
        this.zipcodeValue = zipcode;
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
        });
    } else {
      this.openSnackBar('Invalid zip code', 2000);
    }
  }

  public submitForm() {
    this.form.markAllAsTouched();
    const dataForm = this.form.getRawValue();

    if (this.form.valid) {
      this.openSnackBar('Form sent successfully!', 2000);
      this.resetForm();
    } else {
      localStorage.setItem('saved_address', JSON.stringify(dataForm));
      this.openSnackBar('Invalid fields', 2000);
    }
  }

  public resetForm(): void {
    this.form.reset();

    localStorage.removeItem('saved_address');
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  public zipCodePatterMask(): void {
    const zipcodeLenght = this.form.get('zipcode')?.value.length;

    if (zipcodeLenght === 5) {
      this.form.patchValue({
        zipcode: (this.zipcodeValue += '-'),
      });
    }
  }

  public openSnackBar(data: string, duration: number) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: data,
      duration: duration,
    });
  }

  ngOnDestroy(): void {
    this.zipcodeSubscription.unsubscribe();
  }
}

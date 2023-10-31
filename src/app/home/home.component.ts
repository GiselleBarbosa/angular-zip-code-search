import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FindAddressService } from './services/find-address.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  styles: [
    `
      .form {
        min-width: 150px;
        max-width: 500px;
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
})
export class HomeComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _findAdressService: FindAddressService
  ) {}

  public form!: FormGroup;

  public ngOnInit(): void {
    this.setDataForm();
  }

  public setDataForm(): void {
    this.form = this._fb.group({
      zipcode: ['', Validators.required],
      address: ['', Validators.required],
      reference: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  public PopulateFields(): void {
    const zipcode = this.form.get('zipcode')?.value;

    if (zipcode && zipcode.length === 8) {
      this._findAdressService
        .findAddress(zipcode)
        .pipe(take(1))
        .subscribe((apiAddressData) => {
          this.form.patchValue({
            address: apiAddressData.logradouro,
            neighborhood: apiAddressData.bairro,
            city: apiAddressData.localidade,
            state: apiAddressData.uf,
            country: 'Brasil',
          });
        });
    } else {
      alert('Invalid zip code');
    }
  }

  public submitForm() {
    if (this.form.valid) alert('Form Sent');
    else alert('Invalid fields');
  }
}

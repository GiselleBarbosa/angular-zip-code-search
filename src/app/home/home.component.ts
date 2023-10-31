import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FindAddressService } from './services/find-address.service';

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

  public submitForm() {
    if (this.form.valid) alert('Enviou formulario');
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

  public setFieldValues(): void {
    const zipcode = this.form.get('zipcode')?.value;

    this._findAdressService.findAddress(zipcode).subscribe((apiAddressData) => {
      this.form.patchValue({
        address: apiAddressData.logradouro,
        neighborhood: apiAddressData.bairro,
        city: apiAddressData.localidade,
        state: apiAddressData.uf,
        country: 'Brasil',
      });
    });
  }
}

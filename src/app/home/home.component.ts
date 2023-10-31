import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private _fb: FormBuilder) {}

  public form!: FormGroup;

  public ngOnInit(): void {
    this.setDataForm();
  }

  public submitForm() {
    if (this.form.valid) 
    alert('Enviou formulario');
  }

  public setDataForm(): void {
    this.form = this._fb.group({
      zipcode: ['', Validators.required],
      address: ['', Validators.required],
      reference: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    });
  }
}

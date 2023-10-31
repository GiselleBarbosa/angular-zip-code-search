import { Component } from '@angular/core';

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
  template: `
    <form class="p-5">
      <table class="full-width-field" cellspacing="0">
        <tr>
          <td>
            <mat-form-field class="small-field ">
              <mat-label>Zip Code</mat-label>
              <input matInput />
            </mat-form-field>
          </td>
        </tr>
        <tr>
          <td>
            <mat-form-field class="full-width-field">
              <mat-label>Address</mat-label>
              <input matInput />
            </mat-form-field>
          </td>
        </tr>

        <tr>
          <td>
            <mat-form-field class="full-width-field">
              <mat-label>Complement</mat-label>
              <input
                matInput
                #reference
                maxlength="50"
                placeholder="Exemplo: Próximo ao colégio"
              />
              <mat-hint align="end">{{ reference.value.length }} / 50</mat-hint>
            </mat-form-field>
          </td>
        </tr>
      </table>

      <table class="full-width-field" cellspacing="0">
        <tr>
          <td>
            <mat-form-field class="full-width-field">
              <mat-label>City</mat-label>
              <input matInput placeholder="Ex. San Francisco" />
            </mat-form-field>
          </td>
        </tr>
        <tr>
          <td>
            <mat-form-field class="full-width-field">
              <mat-label>State</mat-label>
              <input matInput placeholder="Ex. California" />
            </mat-form-field>
          </td>
        </tr>
        <tr>
          <td>
            <mat-form-field class="full-width-field">
              <mat-label>Country</mat-label>
              <input matInput placeholder="Ex. California" />
            </mat-form-field>
          </td>
        </tr>
      </table>
      <button mat-raised-button color="primary" class="w-100 mt-1">Search</button>
    </form>
  `,
})
export class HomeComponent {}

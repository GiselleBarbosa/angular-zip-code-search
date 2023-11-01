import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule],
  template: ` <mat-toolbar
    color="secondary"
    class="d-flex justify-content-center align-items-center"
  >
    <p style="font-size: .75rem; font-weight: 100 ">
      &copy;2023<span style="font-weight: 500; margin-right: 5px"> Zipcode Search </span>
    </p>
    <p style="font-size: .75rem; font-weight: 100 ">
      Developed with ❤️ by Giselle Barbosa
    </p>
  </mat-toolbar>`,
})
export class FooterComponent {}

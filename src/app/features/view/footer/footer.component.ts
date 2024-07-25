import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule, TranslocoModule],
  template: ` <ng-container *transloco="let transloco">
    <mat-toolbar
      color="secondary"
      class="d-flex justify-content-center align-items-center"
    >
      <p style="font-size: .75rem; font-weight: 100 ">
        &copy; {{ currentYear
        }}<span style="font-weight: 500; margin-right: 5px">
          Zipcode Search
        </span>
      </p>
      <p style="font-size: .75rem; font-weight: 100 ">
        {{ transloco('footer.developed-with') }}
        ❤️ {{ transloco('footer.by') }}
      </p>
    </mat-toolbar></ng-container
  >`,
})
export class FooterComponent {
  public currentYear: number;

  constructor() {
    const date = new Date();
    this.currentYear = date.getFullYear();
  }
}

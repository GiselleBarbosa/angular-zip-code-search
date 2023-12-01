import { AsyncPipe, NgIf } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';

import { FooterComponent } from '../footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-template',
  styleUrls: ['template.component.scss'],
  templateUrl: 'template.component.html',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    AsyncPipe,
    FooterComponent,
    TranslocoModule,
  ],
})
export class TemplateComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}

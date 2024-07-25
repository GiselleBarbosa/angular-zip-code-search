import { AsyncPipe, NgIf } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { map, shareReplay } from 'rxjs/operators';

import { FooterComponent } from '../footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';

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
export class TemplateComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private translocoService = inject(TranslocoService);

  private selectedLanguage!: string;

  public ngOnInit(): void {
    const savedLanguageFromLocalstorage = localStorage.getItem('language');

    if (savedLanguageFromLocalstorage) {
      this.selectedLanguage = savedLanguageFromLocalstorage;
      this.translocoService.setActiveLang(this.selectedLanguage);
    }
  }

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  public changeLanguage(): void {
    if (this.translocoService.getActiveLang() === 'en') {
      this.translocoService.setActiveLang('pt');
    } else {
      this.translocoService.setActiveLang('en');
    }

    localStorage.setItem('language', this.translocoService.getActiveLang());
  }
}

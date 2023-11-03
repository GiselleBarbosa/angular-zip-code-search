import { Component } from '@angular/core';
import { TemplateComponent } from './features/view/template/template.component';

@Component({
  selector: 'app-root',
  template: `<app-template />`,
  standalone: true,
  imports: [TemplateComponent],
})
export class AppComponent {}

import { Component } from '@angular/core';
import { EnvironmentService } from './services/env.service';
import { HtmlModifyService } from './services/html-modify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private env: EnvironmentService, private htmlMod: HtmlModifyService) {
    if (this.env.isServer() ) {
      this.htmlMod.patchBaseHref()
    }
  }
}

import { Component } from '@angular/core';
import { EnvironmentService } from '../services/env.service';
import { HtmlModifyService, LinkRelAttr} from '../services/html-modify.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isBrowser: boolean = false;

  constructor(private envSerivce: EnvironmentService, private htmlModify: HtmlModifyService) {
    
    // Add Title tag
    this.htmlModify.addPageTitle('Science Fiction Movies Shop');

    // Add meta description tag
    this.htmlModify.addMetaTag('description', 'Welcome to Science Fiction Movies Shop');

    // Add <link rel='canonical' href> tag
    this.htmlModify.setLinkTag(LinkRelAttr.canonical, '/')
  }

  ngOnInit(): void {
    this.isBrowser = this.envSerivce.isBrowser()
  }
}
